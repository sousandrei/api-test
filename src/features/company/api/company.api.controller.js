const Company = require('../company.schema')

exports.get = async (req, res) => {

	let user = Company
		.query({})
		.orderBy('-name')
		.fetchPage({
			pageSize: 5,
			page: 1
		})

	user = await user

	return res.status(200).json(user)
}
