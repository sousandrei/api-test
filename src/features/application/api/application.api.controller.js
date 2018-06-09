const Application = require('../application.schema')

exports.get = async (req, res) => {

	let user = Application
		.query({})
		.orderBy('-user_id')
		.fetchPage({
			pageSize: 5,
			page: 1
		})

	user = await user

	return res.status(200).json(user)
}
