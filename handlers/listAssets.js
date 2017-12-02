const fs = require('fs')
const path = require('path')

module.exports = root => {
  const folders = fs.readdirSync(root)
  return folders
    .filter(folder => folder[0] !== '.')
    .map(folder => {
      const files = fs.readdirSync(path.resolve(root, folder))
      return files.map(file => `${folder}/${file}`)
    })
    .filter(files => files.length !== 0)
    .reduce(
      (curr, next) =>
        `${curr}${next.reduce(
          (c, n) => `${c}<br><a href="/upload/${n}">${n}</a>`,
          ''
        )}<br>`,
      ''
    )
}
