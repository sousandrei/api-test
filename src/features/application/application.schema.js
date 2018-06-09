const Bookshelf = require('../../../config/bookshelf').getBookshelf()

const Application = Bookshelf.Model.extend({
	tableName: 'applications',

	user_id: function () {
		return this.belogsTo('User')
	},
	listing_id: function () {
		return this.belogsTo('Listing')
	},
})


module.exports = Bookshelf.model('Application', Application)