const Hashids = require('hashids')
const db = require('../database')

const extractExif = require('./extractExif')

const hashids = new Hashids('PostkARte', 6, 'ABCDEFGHJKLMNPQRSTUVWXYZ123456789')

module.exports = async ({ assets, latitude, longitude, text, uuid }) => {
  let result = await Promise.all(
    assets
      .filter(asset => asset.type === 'image')
      .map(({ path }) => extractExif(path))
  )
  result = result
    .filter(({ latitude, longitude }) => latitude && longitude)
    .reduce(
      (accu, curr, i, array) => ({
        latitude: accu.latitude + curr.latitude,
        longitude: accu.longitude + curr.longitude,
        num: array.length
      }),
      { latitude: 0, longitude: 0 }
    )
  result = {
    latitude: result.latitude / result.num,
    longitude: result.longitude / result.num
  }
  return db.transaction(trx =>
    trx
      .insert({
        code: 'temp',
        latitude: latitude || result.latitude,
        longitude: longitude || result.longitude,
        text,
        uuid
      })
      .into('postcard')
      .then(data => data[0])
      .then(postcardId => {
        const code = hashids.encode(postcardId)
        return Promise.all(
          assets
            .map(({ uuid, filename, type }) =>
              trx
                .insert({
                  uuid,
                  type,
                  url: `/${filename}`,
                  postcard_id: postcardId
                })
                .into('asset')
            )
            .concat(
              trx
                .update({ code })
                .from('postcard')
                .where('id', postcardId)
            )
        ).then(() => code)
      })
  )
}
