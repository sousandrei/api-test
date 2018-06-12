const { get } = require('./dashboard.api.controller')
const { isLoggedIn } = require('../../auth').api.controller

module.exports = async function (app) {

	app.route('/api/topActiveUsers')
		.get(isLoggedIn, get)

}
