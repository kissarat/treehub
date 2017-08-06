const Node = require('./node')
const Hash = require('./hash')
const config = require('./default')
const Seq = require('sequelize')
const models = require('./models')
const path = require('path')
const ignore = require('./ignore')
const fs = require('fs')

async function main(prefix = process.cwd()) {
  try {
    const db = new Seq(config.database)
    await db.authenticate()
    models.setup(db)
    try {
      const gitignore = fs.readFileSync(prefix + '/.gitignore').toString('utf8')
      config.excludes = config.excludes.concat(ignore(gitignore))
    }
    catch (ex) {

    }
    const root = new Node(prefix)
    await root.getStat(prefix)
    const nodes = [root]
    await root.visit(config, nodes)
    // nodes.sort((a, b) => a.compare(b))
    const hash = new Hash(config.hash)
    let nodeModels = []
    for (const node of nodes) {
      const path = node.path
      const nodeModel = {
        id: path.replace(prefix, ''),
        type: node.stat.isDirectory() ? 0 : 1,
        size: node.stat.size,
        time: node.stat.mtime.toISOString()
      }
      const ext = /\.(\w+)$/.exec(node.name)
      if (ext) {
        nodeModel.ext = ext[1]
      }
      if (nodeModel.type) {
        nodeModel.hash = await hash.digest(path)
      }
      nodeModels.push(nodeModel)
      if (nodeModels.length >= 200) {
        await models.Node.bulkCreate(nodeModels)
        nodeModels = []
      }
    }
    if (nodeModels.length > 0) {
      await models.Node.bulkCreate(nodeModels)
    }
  }
  catch (ex) {
    console.error(ex)
  }
  // console.log(config.excludes)
}

main(path.normalize(process.argv[process.argv.length - 1]))
