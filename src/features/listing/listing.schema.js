const Bookshelf = require('../../../config/bookshelf').getBookshelf()

const Listing = Bookshelf.Model.extend({
	tableName: 'listings',
	created_by: function () { return this.belogsTo('User') },
})


module.exports = Bookshelf.model('Listing', Listing)