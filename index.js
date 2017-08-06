const Node = require('./node')
const Hash = require('./hash')
const config = require('./default')
const Seq = require('sequelize')
const models = require('./models')
const path = require('path')

async function main(prefix = process.cwd()) {
  try {
    const db = new Seq(config.database)
    await db.authenticate()
    db.setup(db)
    const root = new Node(prefix)
    await root.getStat(prefix)
    const nodes = []
    await root.visit(config, nodes)
    nodes.sort((a, b) => a.compare(b))
    const hash = new Hash(config.hash)
    for (const node of nodes) {
      const path = node.path
      const mNode = {
        id: path.replace(prefix, ''),
        type: node.stat.isDirectory() ? 0 : 1,
        size: node.stat.size,
        time: node.stat.mtime.toISOString()
      }
      const ext = /.(\w+)$/.exec(node.name)
      if (ext) {
        mNode.ext = ext[1]
      }
      if (mNode.type) {
        mNode.hash = await hash.digest(path)
      }
      await models.Node.create(mNode)
    }
  }
  catch (ex) {
    console.error(ex)
  }
}

main(path.normalize(process.argv[process.argv.length - 1]))
