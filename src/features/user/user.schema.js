const Bookshelf = require('../../../config/bookshelf').getBookshelf()

const User = Bookshelf.Model.extend({
	tableName: 'users',

	companies: function () {
		return this.hasMany('Team', 'user_id')
	},
	createdListings: function () {
		return this.hasMany('Listing', 'created_by')
	},
	applications: function () {
		return this.hasMany('Application', 'user_id')
	},
})


module.exports = Bookshelf.model('User', User)