const {
	ENV,
	POSTGRES_URL,
	POSTGRES_PORT,
	POSTGRES_USER,
	POSTGRES_DATABASE,
	KNEX_DEBUG,
} = process.env

let Knex = require('knex')
let Bookshelf = require('bookshelf')

exports.getBookshelf = () => Bookshelf
exports.getKnex = () => Knex

exports.startBookshelf = async () => {
	try {
		Knex = Knex({
			debug: JSON.parse(KNEX_DEBUG),
			client: 'pg',
			connection: {
				host: POSTGRES_URL,
				port: POSTGRES_PORT,
				user: POSTGRES_USER,
				database: POSTGRES_DATABASE
			}
		})

		Bookshelf = Bookshelf(Knex)
		Bookshelf.plugin('pagination')
		Bookshelf.plugin('registry')

	} catch (err) /* istanbul ignore next */ {
		console.error(err)
	}

	/* istanbul ignore next */
	if (ENV != 'test')
		console.log('postgres connected')
}

exports.stopBookshelf = async () => {

	try {
		await Knex.destroy()
	} catch (err) /* istanbul ignore next */ {
		console.error(err)
	}

	/* istanbul ignore next */
	if (ENV != 'test')
		console.log('postgres disconnected')
}