const Node = require('./node')
const Hash = require('./hash')
const config = require('./default')

async function main(name = process.cwd()) {
  try {
    const root = new Node(name)
    await root.getStat(name)
    const nodes = []
    await root.visit(config, nodes)
    nodes.sort((a, b) => a.compare(b))
    const hash = new Hash(config.hash)
    for(const node of nodes) {
      const path = node.path
      const digest = node.stat.isDirectory() ? '\t' : await hash.digest(path)
      console.log(node.stat.size, digest.toString('hex'), path)
    }
  }
  catch (ex) {
    console.error(ex)
  }
}

main()
