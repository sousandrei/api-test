const Bookshelf = require('../../../config/bookshelf').getBookshelf()

const Team = Bookshelf.Model.extend({
	tableName: 'teams',
	idAttribute: 'user_id',

	company_id: function () { return this.belogsTo('Company') },
	user_id: function () { return this.belogsTo('User') },
})


module.exports = Bookshelf.model('Team', Team)