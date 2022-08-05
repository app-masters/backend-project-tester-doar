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
    it('should return 200 OK - User Saved', async () => {
      counter.newTest();
      const user = makeUser();

      const response = await request(`${baseUrl}/donation`).post('/').send(user);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('success', true);
      counter.increment(1);
    });

    it('should return 400 BAD REQUEST - Incorrect Total Devices', async () => {
      counter.newTest();
      const user = makeUser();
      user.deviceCount = 0;

      const response = await request(`${baseUrl}/donation`).post('/').send(user);

      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty('error', true);
      counter.increment(1);
    });

    it('should return 400 BAD REQUEST - Without Devices', async () => {
      counter.newTest();
      const user = makeUser();
      user.devices = [];

      const response = await request(`${baseUrl}/donation`).post('/').send(user);

      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty('error', true);
      counter.increment(1);
    });

    it('should return 400 BAD REQUEST - Without State', async () => {
      counter.newTest();
      const user = makeUser();

      const response = await request(`${baseUrl}/donation`)
        .post('/').send({ ...user, state: undefined });

      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty('error', true);
      expect(response.body).toHaveProperty('requiredFields', ['state']);
      counter.increment(1);
    });

    it('should return 400 BAD REQUEST - Without City and neighborhood', async () => {
      counter.newTest();
      const user = makeUser();

      const response = await request(`${baseUrl}/donation`).post('/')
        .send({ ...user, city: undefined, neighborhood: undefined });

      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty('error', true);
      expect(response.body).toHaveProperty('requiredFields', ['city', 'neighborhood']);
      counter.increment(1);
    });

    it('should return 400 BAD REQUEST - Sending spaces other than null', async () => {
      counter.newTest();
      const user = makeUser();

      const response = await request(`${baseUrl}/donation`).post('/')
        .send({ ...user, city: ' ', neighborhood: '', complement: '  ' });

      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty('error', true);
      expect(response.body).toHaveProperty('errorMessage');
      counter.increment(1);
    });

    it('should return 400 BAD REQUEST - Invalid Type Device', async () => {
      counter.newTest();
      const user = makeUser();
      user.devices[0].type = 'Invalid Type';

      const response = await request(`${baseUrl}/donation`).post('/').send(user);

      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty('error', true);
      counter.increment(1);
    });

    it('should return 400 BAD REQUEST - Invalid Condition Device', async () => {
      counter.newTest();
      const user = makeUser();
      user.devices[0].condition = 'Invalid Condition';

      const response = await request(`${baseUrl}/donation`).post('/').send(user);

      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty('error', true);
      counter.increment(1);
    });
  });
};

export { testDonation };
