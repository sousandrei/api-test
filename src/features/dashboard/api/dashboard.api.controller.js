/*
 implements the dashboard functions
 complex QUERY is made direclty on Knex, stepping over Bookshelf
 */

const { groupBy, reduce } = require('lodash')
const moment = require('moment')

const Knex = require('../../../../config/bookshelf').getKnex()

const { PAGE_SIZE } = process.env

exports.get = async (req, res) => {

	let { page } = req.query

	if (!page || page < 1)
		return res.status(400).end()

	if (isNaN(parseFloat(page)))
		return res.status(400).end()

	const LAST_WEEK = moment().subtract(7, 'days').toISOString()

	try {

		let query = `
		select * 
		from (
			select  us.*,
					listings.name as listing_name,
					ROW_NUMBER() OVER(PARTITION by applications.user_id order by
						applications.created_at desc) as rnk
			from (
				select 
					apps.created_at as application_created_at,
					apps.id as application_id,
					apps.user_id,
					apps.listing_id,
					users.name as user_name,
					users.created_at as user_created_at,
					count
				from (
					select  *,
							ROW_NUMBER() OVER(PARTITION by user_id order by
								created_at desc) as rnk,
							count(*) over(PARTITION by user_id) as count
					from applications
					where created_at > '${LAST_WEEK}'
				) apps
				inner join users on users.id = apps.user_id
				where rnk = 1
			) us
			inner join applications on applications.user_id = us.user_id
			inner join listings on listings.id = applications.listing_id
		) result
		where rnk < 4
		`

		let { rows: users } = await Knex.raw(query)

		if (!users.length)
			return res.status(404).end()

		users = parseQuery(users)

		users = groupBy(users, u => u.user.id)

		users = formBody(users)

		let initPage = (page * PAGE_SIZE) - PAGE_SIZE
		let endPage = initPage + PAGE_SIZE
		
		// TODO: limit in query not in JS
		users = users.splice(initPage, endPage)

		return res.status(200).json(users)
	} catch (err) {
		console.error(err)
		return res.status(500).end()
	}


}

function parseQuery(users) {

	let result = []

	for (let i in users) {
		let aux = {}

		for (let k in users[i]) {

			let subKey = k.split('_')
			let newKey = subKey.shift()
			let newSubKey = subKey.join('_')

			if (!aux[newKey])
				aux[newKey] = {}

			newSubKey ?
				aux[newKey][newSubKey] = users[i][k]
				: aux[newKey] = users[i][k]

		}
		result.push(aux)
	}
	return result
}

function formBody(users) {
	let aux = []

	for (let i in users) {
		users[i].length <= 1 ?
			aux.push(parseDbUser(users[i][0]))
			: aux.push(reduce(users[i], parseDbUser))
	}

	aux = aux.map(user => {
		let {
			user: {
				id,
				name,
				created_at: createdAt
			},
			count,
			listings
		} = user

		return {
			id,
			createdAt,
			name,
			count,
			listings
		}
	})

	return aux
}

function parseDbUser(result, value) {

	if (!Array.isArray(result.listings))
		result.listings = [result.listing.name]

	if (value)
		result.listings.push(value.listing.name)

	return result
}