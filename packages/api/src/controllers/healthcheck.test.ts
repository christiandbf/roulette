import request from 'supertest';
import app from '../app';

describe('GET / - a simple api healthcheck endpoint', () => {
	it('API running properly', () => {
		return request(app).get('/').expect(200, {
			message: 'Server is running!!!'
		});
	});
});
