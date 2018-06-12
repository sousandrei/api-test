require('dotenv').config()

const {
	PORT,
	ENV
} = process.env

/* istanbul ignore next */
process.on('unhandledRejection', (reason, p) => console.error(reason, p))

async function main() {

	console.log('starting')
	
	await require('./config/bookshelf').startBookshelf()
	
	let app = require('./config/express')()
	
	let server = await startServer(app)

	/* istanbul ignore next */
	process.on('SIGTERM', stopServer)

	server.stopServer = stopServer

	return { app, server }

}

async function stopServer(server) {
	console.log('exiting')
	
	await new Promise(resolve => server.close(resolve))

	/* istanbul ignore next */
	if (ENV != 'test')
		console.log('HTTP server offline')

	await require('./config/bookshelf').stopBookshelf()
}

function startServer(app) {
	return new Promise(resolve => {
		let server = require('http')
			.createServer(app)
			.listen(PORT, () => {
				/* istanbul ignore next */
				if (ENV != 'test')
					console.log(`HTTP server online ${PORT}`)

				resolve(server)
			})
	})
}

module.exports = main()