const express = require('express')
const bodyParser = require('body-parser')

const db = require('./database')

const port = 3000

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello')
})

app
  .route('/postcard')
  .get((req, res) => {
    db
      .select()
      .from('postcard')
      .then(data => res.send(data))
  })
  .post((req, res) => {
    db.insert(req.body).into('postcard').then(data => res.send(data))
  })

app.listen(port, () => {
  console.log('Server is listening on port:', port)
})
