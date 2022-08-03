import request from 'supertest';
import { Grades } from './grades';

const testRoot = (baseUrl: string, counter: Grades) => {
  describe('[Root]', () => {
    it('should return body json alive:true', async () => {
      const response = await request(baseUrl).get('/');
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({ alive: true });
      counter.increment(5);
    });
  });
};

export { testRoot };
