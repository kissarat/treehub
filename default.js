module.exports = {
  hash: {
    algorithm: 'md5',
    chunk: {
      size: 8 * 1024 * 1024
    }
  },

  database: {
    dialect: 'sqlite',
    storage: 'treehub.sqlite',
    freezeTableName: true
  },

  excludes: [
    /treehub\.\w+$/,
    '/.',
    // /\.(jpg|png|gif|mp3|pdf|dat|bz2|sql|png|swf|eot|woff2?|ttf|min\.js|gz|vtt)$/
  ]
}
