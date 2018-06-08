module.exports = {
	model: require('./user.schema.js'),
	api: {
		controller: require('./api/user.api.controller.js'),
		route: require('./api/user.api.route.js')
	}
}
