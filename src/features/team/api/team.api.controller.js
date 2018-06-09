const Team = require('../team.schema')

exports.get = async (req, res) => {

	let user = Team
		.query({})
		.orderBy('-company_id')
		.fetchPage({
			pageSize: 5,
			page: 1
		})

	user = await user

	return res.status(200).json(user)
}
