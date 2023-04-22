import request from 'supertest';
import app from '../../index';

describe('GET /api/v1/relays', () => {
    it('it should return an object of relays', async () => {
	const response = await request(app).get('/api/v1/relays');
	expect(response.statusCode).toBe(200);
	console.log(response.body);
	expect(response.body).toBeInstanceOf(Object);
    });
});
