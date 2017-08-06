exports.setup = function (db) {
  exports.Node = db.define('node', require('./node'), {tableName: 'node', timestamps: false})
}
