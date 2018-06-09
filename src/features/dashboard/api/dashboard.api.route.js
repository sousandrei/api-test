const { get } =
	require('./dashboard.api.controller')

module.exports = async function (app) {

	app.route('/api/topActiveUsers')
		.get(get)

}
