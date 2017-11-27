const fs = require('fs')
const request = require('request')
const FormData = require('form-data')

const recognizerUrl = process.env.RECOGNIZER_HOST

module.exports = ({ code, path }) => {
  var formData = {
    id: code,
    file: fs.createReadStream(path)
  }
  return new Promise((resolve, reject) =>
    request.post(
      { url: `${recognizerUrl}/recognizer/save/`, formData: formData },
      (err) => err ? reject(err) : resolve(code)
    )
  )
}
