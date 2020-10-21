import request from 'supertest';

import app from '../../../src/api/app';

describe('GET / - a simple api healthcheck endpoint', () => {
	it('API runing properly', () => {
		return request(app).get('/').expect(200, {
			message: 'Server is running!!!'
		});
	});
});
