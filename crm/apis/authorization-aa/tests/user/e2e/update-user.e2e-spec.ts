import request from 'supertest';

import { TypeormExpressApp } from '../../../src/typeorm-express.app';

describe('UpdateUser (e2e)', () => {
	let app: TypeormExpressApp;

	beforeAll(async () => {
		app = new TypeormExpressApp();
		await app.start();
	});

	afterAll(async () => {
		await app.stop();
	});

	it('/user/:id (PUT)', () => {
		return request(app.httpServer)
			.put('/user/784a28b4-a777-47b8-b4ed-9fdc591d0d7d')
			.send({
				name: 'AARON',
				roleId: '2b2fe2d7-252f-48c6-80c5-e80799f63f44',
			})
			.expect(201)
			.expect({});
	});

	it('/user (GET)', () => {
		return request(app.httpServer)
			.get('/user')
			.expect(200)
			.expect((res) => {
				expect(res.body).toBeDefined()
			});
	});
});
