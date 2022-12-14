import request from 'supertest';
import { Grades } from './grades';

const testDonation = (baseUrl: string, counter: Grades) => {
  const makeUser = () => ({
    name: 'Test User',
    email: 'test@test.com',
    city: 'Test City',
    state: 'Test State',
    neighborhood: 'Test Neighborhood',
    zip: '36301-154',
    streetAddress: 'Test Street Address',
    number: 123,
    complement: 'Test Complement',
    phone: '11999999999',
    deviceCount: 2,
    devices: [
      { type: 'desktop', condition: 'working' },
      { type: 'printer', condition: 'broken' },
    ],
  });

  describe('[Donation]', () => {
    it('should Test CORS', async () => {
      counter.newTest();
      const response = await request(baseUrl).options('/donation');

      expect(response.headers['access-control-allow-origin']).toBeTruthy();
      counter.increment(1);
    });

    it('should GET donations', async () => {
      counter.newTest();
      const user = makeUser();
      user.number = new Date().getTime();
      console.log(user);

      const responsePost = await request(baseUrl)
        .post('/donation')
        .send(user);

      expect(responsePost.status).toBe(200);

      const response = await request(baseUrl).get('/donation');

      expect(response.status).toBe(200);
      expect(response.type).toBe('application/json');
      expect(response.body).toEqual(
        expect.arrayContaining(
          [expect.objectContaining({ number: user.number })],
        ),
      );
      counter.increment(1);
    });

    it('should return 200 OK - User Saved', async () => {
      counter.newTest();
      const user = makeUser();

      const response = await request(`${baseUrl}/donation`).post('/').send(user);

      if (response.statusCode !== 200) { console.log('response.statusCode!==200 - User Saved', response.body); }
      expect(response.statusCode).toBe(200);
      expect(response.type).toBe('application/json');
      expect(response.body).toHaveProperty('success', true);
      counter.increment(1);
    });

    it('should return 200 OK - Without email and complement', async () => {
      counter.newTest();
      const user = makeUser();

      const response = await request(`${baseUrl}/donation`).post('/')
        .send({
          ...user, email: undefined, complement: undefined,
        });

      if (response.statusCode !== 200) { console.log('response.statusCode!==200 - Without email and complement', response.body); }

      expect(response.statusCode).toBe(200);
      expect(response.type).toBe('application/json');
      expect(response.body).toHaveProperty('success', true);
      counter.increment(1);
    });

    it('should return 400 BAD REQUEST - Incorrect Total Devices', async () => {
      counter.newTest();
      const user = makeUser();
      user.deviceCount = 0;

      const response = await request(`${baseUrl}/donation`).post('/').send(user);

      expect(response.statusCode).toBe(400);
      expect(response.type).toBe('application/json');
      expect(response.body).toHaveProperty('error', true);
      expect(response.body).toHaveProperty('errorMessage');
      counter.increment(1);
    });

    it('should return 400 BAD REQUEST - Without Devices', async () => {
      counter.newTest();
      const user = makeUser();
      user.devices = [];

      const response = await request(`${baseUrl}/donation`).post('/').send(user);

      expect(response.statusCode).toBe(400);
      expect(response.type).toBe('application/json');
      expect(response.body).toHaveProperty('error', true);
      expect(response.body).toHaveProperty('errorMessage');
      counter.increment(1);
    });

    it('should return 400 BAD REQUEST - Without State', async () => {
      counter.newTest();
      const user = makeUser();

      const response = await request(`${baseUrl}/donation`)
        .post('/').send({ ...user, state: undefined });

      expect(response.statusCode).toBe(400);
      expect(response.type).toBe('application/json');
      expect(response.body).toHaveProperty('error', true);
      expect(response.body).toHaveProperty('errorMessage');
      expect(response.body).toHaveProperty('requiredFields');
      expect(response.body).toHaveProperty('requiredFields', ['state']);
      expect(response.body.requiredFields.includes('state') === true).toBeTruthy();
      counter.increment(1);
    });

    it('should return 400 BAD REQUEST - Without City and neighborhood', async () => {
      counter.newTest();
      const user = makeUser();

      const response = await request(`${baseUrl}/donation`).post('/')
        .send({ ...user, city: undefined, neighborhood: undefined });

      expect(response.statusCode).toBe(400);
      expect(response.type).toBe('application/json');
      expect(response.body).toHaveProperty('error', true);
      expect(response.body).toHaveProperty('requiredFields');
      expect(response.body).toHaveProperty('requiredFields', ['city', 'neighborhood']);
      expect(response.body).toHaveProperty('errorMessage');
      counter.increment(1);
    });

    it('should return 400 BAD REQUEST - Sending spaces other than null', async () => {
      counter.newTest();
      const user = makeUser();

      const response = await request(`${baseUrl}/donation`).post('/')
        .send({
          ...user, city: ' ', neighborhood: '', complement: '  ',
        });

      expect(response.statusCode).toBe(400);
      expect(response.type).toBe('application/json');
      expect(response.body).toHaveProperty('error', true);
      expect(response.body).toHaveProperty('errorMessage');
      expect(response.body).toHaveProperty('requiredFields');
      counter.increment(1);
    });

    it('should return 400 BAD REQUEST - Invalid Type Device', async () => {
      counter.newTest();
      const user = makeUser();
      user.devices[0].type = 'Invalid Type';

      const response = await request(`${baseUrl}/donation`).post('/').send(user);

      expect(response.statusCode).toBe(400);
      expect(response.type).toBe('application/json');
      expect(response.body).toHaveProperty('error', true);
      expect(response.body).toHaveProperty('errorMessage');
      counter.increment(1);
    });

    it('should return 400 BAD REQUEST - Invalid Condition Device', async () => {
      counter.newTest();
      const user = makeUser();
      user.devices[0].condition = 'Invalid Condition';

      const response = await request(`${baseUrl}/donation`).post('/').send(user);

      expect(response.statusCode).toBe(400);
      expect(response.type).toBe('application/json');
      expect(response.body).toHaveProperty('error', true);
      expect(response.body).toHaveProperty('errorMessage');
      counter.increment(1);
    });
  });
};

export { testDonation };
