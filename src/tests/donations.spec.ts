import request from 'supertest';
import { Grades } from './grades';

const testDonation = (baseUrl: string, counter: Grades) => {
  describe('[Donation]', () => {
    it('should response status 200', async () => {
      const response = await request(`${baseUrl}/donation`).get('/');
      expect(response.status).toBe(200);
      counter.increment(5);
    });
  });
};

export { testDonation };
