const crypto = require('crypto')
const algorithms = require('./algorithms')
const fs = require('fs')

module.exports = class Hash {
  constructor(options) {
    Object.assign(this, options)
    this.buffer = Buffer.allocUnsafe(this.chunk.size)
  }

  digest(name) {
    return new Promise((resolve, reject) => {
      this.hash = crypto.createHash(this.algorithm)
      fs.open(name, 'r', async(err, fd) => {
        if (err) {
          return reject(err)
        }
        while (await this.updateChunk(fd)) {
        }
        resolve(this.hash.digest())
      })
    })
  }

  updateChunk(fd) {
    return new Promise((resolve, reject) => {
      fs.read(fd, this.buffer, 0, this.buffer.length, null, (err, length, buffer) => {
        if (err) {
          return reject(err)
        }
        const isFull = length >= this.buffer.length
        this.hash.update(isFull ? buffer : buffer.slice(0, length))
        resolve(isFull)
      })
    })
  }
}
