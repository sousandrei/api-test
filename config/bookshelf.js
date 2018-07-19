/* 
 setup postgres connection
 can retrieve bookshelf and knex instances to reuse in other places
 */

const {
	ENV,
	POSTGRES_URL,
	POSTGRES_PORT,
	POSTGRES_USER,
	POSTGRES_DATABASE,
	POSTGRES_PASSWORD,
	KNEX_DEBUG,
} = process.env

let Knex = require('knex')
let Bookshelf = require('bookshelf')

const { info } = require('./logger')

exports.getBookshelf = () => Bookshelf
exports.getKnex = () => Knex

exports.startBookshelf = async () => {
	try {
		Knex = await Knex({
			debug: JSON.parse(KNEX_DEBUG),
			client: 'pg',
			connection: {
				host: POSTGRES_URL,
				port: POSTGRES_PORT,
				user: POSTGRES_USER,
				password: POSTGRES_PASSWORD,
				database: POSTGRES_DATABASE
			}
		})

		Bookshelf = Bookshelf(Knex)
		Bookshelf.plugin('pagination')
		Bookshelf.plugin('registry')

	} catch (err) /* istanbul ignore next */ {
		throw err
	}

	info('postgres connected')
}

exports.stopBookshelf = async () => {

	try {
		await Knex.destroy()
	} catch (err) /* istanbul ignore next */ {
		throw err
	}

	info('postgres disconnected')
}