const models = require('../models')

module.exports = {
  up(q) {
    return q.createTable('node', models.Node.attributes)
  },

  down(q) {
    return q.dropAllTables()
  }
}
