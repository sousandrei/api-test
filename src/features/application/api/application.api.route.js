const { get } =
	require('./application.api.controller')

module.exports = async function (app) {

	app.route('/api/applications')
		.get(get)

}
