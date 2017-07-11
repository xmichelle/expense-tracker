const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')

const expenditures = []

const publicPath = path.join(__dirname, 'public')
const staticMiddleware = express.static(publicPath)
app.use(staticMiddleware)

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
