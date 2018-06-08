const {
	ENV,
	POSTGRES_URL,
	POSTGRES_PORT,
	POSTGRES_USER,
	POSTGRES_DATABASE
} = process.env

let knex = require('knex')
let bookshelf = require('bookshelf')

exports.getBookshelf = () => bookshelf

exports.startBookshelf = async () => {
	try {
		knex = knex({
			client: 'pg',
			connection: {
				host: POSTGRES_URL,
				port: POSTGRES_PORT,
				user: POSTGRES_USER,
				database: POSTGRES_DATABASE
			}
		})

		bookshelf = bookshelf(knex)
		bookshelf.plugin('pagination')

	} catch (err) /* istanbul ignore next */ {
		console.error(err)
	}

	/* istanbul ignore next */
	if (ENV == 'dev')
		console.log('postgres connected')
}

exports.stopBookshelf = async () => {

	try {
		await knex.destroy()
	} catch (err) /* istanbul ignore next */ {
		console.error(err)
	}

	/* istanbul ignore next */
	if (ENV == 'dev')
		console.log('postgres disconnected')
}