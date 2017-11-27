const fs = require('fs')
const request = require('request')
const FormData = require('form-data')

const recognizerUrl = process.env.RECOGNIZER_HOST

module.exports = (path) => {
  var formData = {
    file: fs.createReadStream(path)
  }
  return new Promise((resolve, reject) =>
    request.post(
      { url: `${recognizerUrl}/recognizer/match/`, formData: formData },
      (err, response, body) => err ? reject(err) : resolve(body)
    )
  )
}
