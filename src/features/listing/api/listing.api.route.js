const { get } =
	require('./listing.api.controller')

module.exports = async function (app) {

	app.route('/api/listings')
		.get(get)

}
