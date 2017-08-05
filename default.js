module.exports = {
  hash: {
    algorithm: 'md5',
    chunk: {
      size: 8 * 1024 * 1024
    }
  },

  database: {
    dialect: 'sqlite',
    storage: 'treehub.sqlite'
  },

  excludes: [
    /treehub\.\w+$/,
    'cache'
  ]
}
