const Bookshelf = require('../../../config/bookshelf').getBookshelf()

const Company = Bookshelf.Model.extend({
	tableName: 'companies'
})


module.exports = Bookshelf.model('Company', Company)