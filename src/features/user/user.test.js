require('dotenv').config()

const request = require('supertest')

describe('user', () => {
	let app, server

	beforeAll(async () => {
		let {
			app: appIndex,
			server: serverIndex
		} = await require('../../../index')

		app = appIndex
		server = serverIndex

	})

	afterAll(async () => await server.stopServer(server))

	describe('get', () => {

		test('no params', async () => {
			await request(app)
				.get('/api/users')
				.expect(400)
		})
		
		test('invalid param', async () => {
			await request(app)
				.get('/api/users?id=a')
				.expect(400)
		})
		
		test('non existant user', async () => {
			await request(app)
				.get('/api/users?id=100')
				.expect(404)
		})
		
		test('user with companies and listings', async () => {
			await request(app)
				.get('/api/users?id=1')
				.expect(200)
		})
		
		test('user with applications', async () => {
			await request(app)
				.get('/api/users?id=2')
				.expect(200)
		})

	})
})
