module.exports = {
	model: require('./company.schema.js'),
	api: {
		controller: require('./api/company.api.controller.js'),
		route: require('./api/company.api.route.js')
	}
}
