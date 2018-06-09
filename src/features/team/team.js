module.exports = {
	model: require('./team.schema.js'),
	api: {
		controller: require('./api/team.api.controller.js'),
		route: require('./api/team.api.route.js')
	}
}
