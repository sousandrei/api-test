require('dotenv').config()

const request = require('supertest')

describe('dashboard', () => {
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

	describe('get topActiveUsers', () => {

		test('without page', async () => {
			await request(app)
				.get('/api/topActiveUsers')
				.expect(400)
		})

		test('with invalid page value', async () => {
			await request(app)
				.get('/api/topActiveUsers?page=a')
				.expect(400)
		})
		
		test('with page', async () => {
			await request(app)
				.get('/api/topActiveUsers?page=1')
				.expect(200)
		})

	})
})
