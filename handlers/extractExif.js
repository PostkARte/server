const ExifImage = require('exif').ExifImage

const convertDMSToDD = (degrees, minutes, seconds, direction) => {
  const dd =
    Number(degrees) + Number(minutes) / 60 + Number(seconds) / (60 * 60)

  if (direction == 'S' || direction == 'W') {
    dd = dd * -1
  }
  return dd
}

module.exports = filepath =>
  new Promise((resolve) => {
    new ExifImage({ image: filepath }, (error, exifData) => {
      try {
        if (error) {
          throw new Error(error)
        }
        const { gps } = exifData
        const {
          GPSLatitudeRef,
          GPSLatitude,
          GPSLongitudeRef,
          GPSLongitude
        } = gps
        const latitude = convertDMSToDD(
          GPSLatitude[0],
          GPSLatitude[1],
          GPSLatitude[2],
          GPSLatitudeRef
        )
        const longitude = convertDMSToDD(
          GPSLongitude[0],
          GPSLongitude[1],
          GPSLongitude[2],
          GPSLongitudeRef
        )
        resolve({ latitude, longitude })
      } catch (error) {
        console.log('EXIF Error: ' + error.message)
        resolve({
          latitude: null,
          longitude: null
        })
      }
    })
  })
