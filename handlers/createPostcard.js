const Hashids = require('hashids')
const uuidV4 = require('uuid').v4
const db = require('../database')

const hashids = new Hashids('PostkARte', 6, 'ABCDEFGHJKLMNPQRSTUVWXYZ123456789')

module.exports = ({ assets, latitude, longitude }) => {
  return db.transaction(trx =>
    trx
      .insert({ code: 'temp', latitude, longitude, uuid: uuidV4() })
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
