const initial = require('./initial')
const Seq = require('sequelize')
const config = require('../default')
const models = require('../models')

async function main() {
  try {
    const db = new Seq(config.database)
    await db.authenticate()
    models.setup(db)
    const method = process.argv[process.argv.length - 1]
    await initial[method](db.queryInterface)
  }
  catch (ex) {
    console.error(ex)
  }
}

main()
