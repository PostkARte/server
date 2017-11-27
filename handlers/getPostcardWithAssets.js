const db = require('../database')

const urlPrefix = process.env.SERVER_HOST

module.exports = ({ code }) => {
  return db
    .first()
    .from('postcard')
    .where('code', code)
    .then(postcard =>
      db
        .select()
        .from('asset')
        .where('postcard_id', postcard.id)
        .then(assets => {
          return {
            ...postcard,
            assets: assets.map(asset => {
              let realUrl = asset.url
              if (asset.url[0] === '/') {
                realUrl = `${urlPrefix}/upload/${asset.type}${realUrl}`
              }
              return {
                ...asset,
                url: realUrl
              }
            })
          }
        })
    )
}
