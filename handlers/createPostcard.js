const db = require('../database')
const uuidV4 = require('uuid').v4

module.exports = ({ assets, code, latitude, longitude }) => {
  return db.transaction(trx =>
    trx
      .insert({ code, latitude, longitude, uuid: uuidV4() })
      .into('postcard')
      .then(data => data[0])
      .then(postcardId =>
        Promise.all(
          assets.map(({ uuid, filename, type }) =>
            trx
              .insert({
                uuid,
                type,
                url: `/${filename}`,
                postcard_id: postcardId
              })
              .into('asset')
          )
        )
      )
  )
}
