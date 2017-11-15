const express = require('express')
const postcard = require('./postcard')

const router = express.Router()

router.get('/', (req, res) => {
  res.send('PostkARte')
})

router.use('/postcard', postcard)

module.exports = router
