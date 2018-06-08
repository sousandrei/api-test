require('dotenv').config()

const { ENV } = process.env

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

		test('all', async () => {
			await request(app)
				.get('/api/users')
				.expect(200)
		})

	})
})
