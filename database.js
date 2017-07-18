const knex = require('knex')({
  dialect: 'pg',
  connection: 'postgres://localhost:5432/expenses'
})

function getCategoryName(id) {
  return knex
    .select('*')
    .from('categories')
    .where('id', id)
}

module.exports = {
  getCategoryName: getCategoryName
}
