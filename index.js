const express = require('express')
const bodyParser = require('body-parser')

const router = require('./routes')

const port = 3000

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static('public'));
app.use('/', router)

app.listen(port, () => {
  console.log('Server is listening on port:', port)
})
