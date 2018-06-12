const { get } = require('./user.api.controller')
const { isLoggedIn } = require('../../auth').api.controller

module.exports = async function (app) {

	app.route('/api/users')
		.get(isLoggedIn, get)

}
