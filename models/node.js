const Seq = require('sequelize')

module.exports = {
  id: {
    type: Seq.STRING,
    primaryKey: true
  },
  type: {
    type: Seq.INTEGER,
    allowNull: false
  },
  size: {
    type: Seq.INTEGER,
    allowNull: false
  },
  time: {
    type: Seq.DATE,
    allowNull: false
  },
  ext: Seq.STRING,
  hash: Seq.BLOB,
}
