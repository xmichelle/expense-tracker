const bodyParser = require('body-parser')
const express = require('express')
const app = express()

const expenditures = []

app.get('/expenditures', (req, res) => {
  res.json(expenditures)
})

app.use(bodyParser.json())

app.post('/expenditures', (req, res) => {
  expenditures.push(req.body)
  res.sendStatus(201)
})

app.listen(3000, () => {
  console.log('Listening on 3000')
})
