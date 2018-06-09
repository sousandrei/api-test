const { get } =
	require('./company.api.controller')

module.exports = async function (app) {

	app.route('/api/companies')
		.get(get)

}
