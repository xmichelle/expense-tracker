const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const { getCategoryName } = require('./database.js')

const knex = require('knex')({
  dialect: 'pg',
  connection: 'postgres://localhost:5432/expenses'
})

const publicPath = path.join(__dirname, 'public')
const staticMiddleware = express.static(publicPath)

app.use(staticMiddleware)
app.use(bodyParser.json())

app.get('/expenditures', (req, res) => {
  knex
    .select('*')
    .from('expenditures')
    .join('categories', 'expenditures.category_id', '=', 'categories.id')
    .orderBy('expenditures.id', 'asc')
    .then((data) => {
      res.json(data)
    })
})

app.post('/expenditures', (req, res) => {
  const expenseData = req.body
  knex
    .insert(expenseData)
    .into('expenditures')
    .returning('*')
    .then((data) => {
      getCategoryName(data[0].category_id)
        .then((categoryName) => {
          const copyCategoryData = Object.assign({}, data[0])
          copyCategoryData.category = categoryName[0].category
          res.status(201).json(copyCategoryData)
        })
    })
})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})
