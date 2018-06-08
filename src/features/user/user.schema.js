const bookshelf = require('../../../config/bookshelf').getBookshelf()

const User = bookshelf.Model.extend({
	tableName: 'users'
})


module.exports = User