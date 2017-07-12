const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')

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
    .from('categories')
    .join('expenditures', 'expenditures.category_id', '=', 'categories.id')
    .then((data) => {
      res.json(data)
    })
})

app.post('/expenditures', (req, res) => {
  const expenseData = req.body
  knex
    .insert(expenseData)
    .into('expenditures')
    .then(() => {
      res.sendStatus(201)
    })
})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})
