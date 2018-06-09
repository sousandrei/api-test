// const User = require('../../user').model

exports.get = async (req, res) => {

	let { page } = req.query

	if (!page)
		return res.status(400).end()

	if (isNaN(parseFloat(page)))
		return res.status(400).end()

	try {

		return res.status(200).json(page)
	} catch (err) {
		return res.status(500).json(err)
	}


}
