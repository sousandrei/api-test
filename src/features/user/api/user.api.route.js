const { get } =
	require('./user.api.controller')

module.exports = async function (app) {

	app.route('/api/users')
		.get(get)

}
