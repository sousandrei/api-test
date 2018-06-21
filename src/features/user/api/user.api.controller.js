/* 
 functions for user routes
 simpler QUERY can be done in bookshelf
 */

const User = require('../user.schema')

exports.get = async (req, res) => {

	let { id } = req.query

	if (!id)
		return res.status(400).end()

	if (isNaN(parseFloat(id)))
		return res.status(400).end()

	try {
		let user = await User
			.where({ id })
			.fetch({
				withRelated: [
					{
						'companies': function (qb) {
							qb
								.select(
									'user_id',
									'companies.id',
									'companies.created_at',
									'companies.name',
									'contact_user as isContact')
								.leftJoin(
									'companies',
									'teams.company_id',
									'companies.id')
						}
					},
					{
						'applications': function (qb) {
							qb
								.select(
									'user_id',
									'applications.id',
									'applications.created_at',
									'listings.id as listings_id',
									'listings.name',
									'listings.description',
									'cover_letter')
								.innerJoin(
									'listings',
									'listings.id',
									'applications.listing_id')
						}
					},
					'createdListings'
				]
			})

		if (!user)
			return res.status(404).end()

		user = user.toJSON()

		for (let c of user.companies)
			delete c.user_id

		for (let a of user.applications) {
			a.listing = {
				id: a.listings_id,
				name: a.name,
				description: a.description
			}

			delete a.user_id
			delete a.name
			delete a.listings_id
			delete a.description
		}

		for (let t of user.createdListings)
			delete t.created_by

		return res.status(200).json(user)
	} catch (err) {
		console.error(err)
		return res.status(500).end()
	}


}
