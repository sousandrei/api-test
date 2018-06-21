/*
 implements the dashboard functions
 complex QUERY is made direclty on Knex, stepping over Bookshelf
 */

const moment = require('moment')

const Knex = require('../../../../config/bookshelf').getKnex()

const { PAGE_SIZE } = process.env

exports.get = async (req, res) => {

	let { page } = req.query

	if (!page)
		return res.status(400).end()

	if (isNaN(parseFloat(page)))
		return res.status(400).end()

	const LAST_WEEK = moment().subtract(10, 'days').toISOString()

	try {

		let users = await Knex.from('users')
			.select('users.id',
				'users.created_at',
				'users.name')
			.innerJoin('applications', 'users.id', 'applications.user_id')
			.where('applications.created_at', '>', LAST_WEEK)
			.limit(PAGE_SIZE)
			.offset((PAGE_SIZE * page) - PAGE_SIZE)
			.map(async u => {
				let applications = await Knex.from('applications')
					.where({ 'user_id': u.id })
					.orderBy('created_at', 'desc')
					.limit(3)

				u.listings = []
				for (let a of applications)
					u.listings.push(await Knex.from('listings')
						.where({ 'id': a.listing_id }).first())

				u.listings = u.listings.map(l => l.name)

				let count = await Knex.from('applications')
					.count()
					.where({ 'user_id': u.id })
					.andWhere('applications.created_at', '>', LAST_WEEK)
					.first()

				u.count = count.count

				return u
			})

		if (!users)
			return res.status(404).end()

		return res.status(200).json(users)
	} catch (err) {
		console.error(err)
		return res.status(500).end()
	}


}
