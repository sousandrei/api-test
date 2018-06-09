module.exports = {
	model: require('./application.schema.js'),
	api: {
		controller: require('./api/application.api.controller.js'),
		route: require('./api/application.api.route.js')
	}
}
