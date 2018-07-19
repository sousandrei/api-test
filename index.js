require('dotenv').config()

const {
	PORT
} = process.env

const { info } = require('./config/logger')

/* istanbul ignore next */
process.on('unhandledRejection', (reason, p) => console.error(reason, p))

async function main() {

	info('starting')

	await require('./config/bookshelf').startBookshelf()

	let app = require('./config/express')()

	let server = await startServer(app)

	/* istanbul ignore next */
	process.on('SIGTERM', stopServer)

	server.stopServer = stopServer

	return { app, server }

}

async function stopServer(server) {
	info('exiting')

	await new Promise(resolve => server.close(resolve))

	info('HTTP server offline')

	await require('./config/bookshelf').stopBookshelf()
}

function startServer(app) {
	return new Promise(resolve => {
		let server = require('http')
			.createServer(app)
			.listen(PORT, () => {
				info(`HTTP server online ${PORT}`)

				resolve(server)
			})
	})
}

module.exports = main()