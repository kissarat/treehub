const fs = require('fs')
const path = require('path')

module.exports = class Node {
  constructor(name, parent = null) {
    this.name = name
    this.parent = parent
  }

  get path() {
    return this.parent ? path.join(this.parent.path, this.name) : this.name
  }

  test(m) {
    const path = this.path
    return m instanceof RegExp ? m.test(path) : path.indexOf(m) >= 0
  }

  list({excludes}) {
    return new Promise((resolve, reject) => {
      fs.readdir(this.path, async(err, names) => {
        if (err) {
          return reject(err)
        }
        const nodes = []
        name: for (const name of names) {
          const node = new Node(name, this)
          for (const ex of excludes) {
            if (node.test(ex)) {
              continue name
            }
            await node.getStat()
          }
          nodes.push(node)
        }
        resolve(nodes)
      })
    })
  }

  async visit(options, nodes) {
    const list = await this.list(options)
    for (const node of list) {
      nodes.push(node)
      if (node.stat.isDirectory()) {
        await node.visit(options, nodes)
      }
    }
  }

  sizeScale() {
    return Math.floor(Math.log2(this.stat.size))
  }

  compare(node) {
    return this.sizeScale() - node.sizeScale() || this.path.localeCompare(node.path)
  }

  getStat(path = this.path) {
    return new Promise((resolve, reject) => {
      fs.lstat(path, (err, stat) => {
        if (err) {
          return reject(err)
        }
        this.stat = stat
        resolve(stat)
      })
    })
  }
}
