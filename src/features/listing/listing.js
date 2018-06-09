module.exports = {
	model: require('./listing.schema.js'),
	api: {
		controller: require('./api/listing.api.controller.js'),
		route: require('./api/listing.api.route.js')
	}
}
