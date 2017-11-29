const path = require('path')
const express = require('express')
const multer = require('multer')
const uuidV4 = require('uuid').v4

const db = require('../database')

const createPostcard = require('../handlers/createPostcard')
const getPostcardWithAssets = require('../handlers/getPostcardWithAssets')
const saveToRecognizer = require('../handlers/saveToRecognizer')
const matchFromRecognizer = require('../handlers/matchFromRecognizer')

const router = express.Router()

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.resolve(__dirname, '..', 'public', 'upload', file.fieldname))
  },
  filename: function(req, file, cb) {
    const uuid = uuidV4()
    const extArray = file.mimetype.split('/')
    const extension = extArray[extArray.length - 1]
    const filename = `${uuid}.${extension}`
    if (!req.tempAssets) {
      req.tempAssets = []
    }
    if (file.fieldname !== 'postcard') {
      req.tempAssets.push({ uuid, filename, type: file.fieldname })
    }
    cb(null, filename)
  }
})

const upload = multer({ storage: storage })

router.get('/', (req, res) => {
  res.send('Please specify postcard code')
})

router.get('/code/:code', (req, res) => {
  const { code } = req.params
  getPostcardWithAssets({ code })
    .then(result => res.send(result))
    .catch(() => res.send({ code: 404, message: 'Postcard Not Found' }))
})

router.post(
  '/',
  upload.fields([
    { name: 'postcard', maxCount: 1 },
    { name: 'image', maxCount: 10 },
    { name: 'video', maxCount: 10 },
    { name: 'audio', maxCount: 10 }
  ]),
  (req, res) => {
    const { tempAssets: assets } = req
    const postcardFile = req.files.postcard[0]
    createPostcard({
      ...req.body,
      assets,
      uuid: postcardFile.filename.split('.')[0]
    })
      .then(code => saveToRecognizer({ code, path: postcardFile.path }))
      .then(code => res.send({ code: 200, message: code }))
      .catch(err =>
        res.send({ code: 500, message: `Something went wrong: ${err}` })
      )
  }
)

router.post(
  '/match',
  upload.fields([{ name: 'postcard', maxCount: 1 }]),
  (req, res) => {
    const postcardFile = req.files.postcard[0]
    matchFromRecognizer(postcardFile.path)
      .then(code => res.redirect(`${req.baseUrl}/code/${code}`))
      .catch(err =>
        res.send({ code: 500, message: `Something went wrong: ${err}` })
      )
  }
)

module.exports = router
