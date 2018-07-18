/*
 implements the dashboard functions
 complex QUERY is made direclty on Knex, stepping over Bookshelf
 */

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
	let initPage = (page * PAGE_SIZE) - PAGE_SIZE
	let endPage = initPage + PAGE_SIZE

	try {

		let query = `
		SELECT  users.id as id,
				users.created_at,
				users.name as name,
				count,
				listings
		FROM (
			SELECT  *,
					ROW_NUMBER() OVER(ORDER BY date_max DESC) AS rank_user
			FROM (
				SELECT	user_id,
						MAX(date_max) AS date_max,
						COUNT(*) AS count,
						array_agg(name) listings
				FROM (
					SELECT	applications.id,
							applications.user_id,
							applications.listing_id,
							listings.name,
							ROW_NUMBER() OVER(PARTITION BY applications.user_id 
								ORDER BY applications.created_at DESC) 
								AS rank_app,
							MAX(applications.created_at) OVER(PARTITION BY 
								applications.user_id) AS date_max
					FROM applications
					INNER JOIN listings ON listings.id = applications.listing_id
				) tbA
				WHERE rank_app < 4 AND date_max > '${LAST_WEEK}'
				GROUP BY user_id
			) tbB
		) apps
		INNER JOIN users ON users.id = apps.user_id
		WHERE rank_user > ${initPage} AND rank_user < ${endPage}
		`

		let { rows: users } = await Knex.raw(query)

		if (!users.length)
			return res.status(404).end()

		return res.status(200).json(users)
	} catch (err) {
		console.error(err)
		return res.status(500).end()
	}


}
