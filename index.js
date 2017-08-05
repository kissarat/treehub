const Node = require('./node')
const config = require('./default')

async function main(name = process.cwd()) {
  try {
    const root = new Node(name)
    await root.getStat(name)
    const nodes = []
    await root.visit(config, nodes)
  }
  catch (ex) {
    console.error(ex)
  }
}

main()
