const db = require('../database')

const urlPrefix = process.env.SERVER_HOST

const getUrl = (url, type) => {
  let realUrl = url
  if (url[0] === '/') {
    realUrl = `${urlPrefix}/upload/${type}${realUrl}`
  }
  return realUrl
}

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
              return {
                ...asset,
                url: getUrl(asset.url, asset.type)
              }
            }),
            postcard: getUrl(`/${postcard.uuid}.jpg`, 'postcard')
          }
        })
    )
}
