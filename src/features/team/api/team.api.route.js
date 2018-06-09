const { get } =
	require('./team.api.controller')

module.exports = async function (app) {

	app.route('/api/teams')
		.get(get)

}
