module.exports = class Visitor {
  constructor(options) {
    Object.assign(this, options)
  }

  async visit(node) {
    if (node.stat.isDirectory()) {
      for(const n of await node.list(this)) {
        await this.visit(n)
      }
    }
    else {
      const old = await this.find(node)
      if (old) {
        await this.update(old, node)
      }
      else {
        await this.create(node)
      }
    }
  }
}
