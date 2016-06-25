/**
 * Read package.json data.
 * @function readJson
 * @param {string} filename - Fie name to read.
 * @returns {Promise}
 */

'use strict'

const fs = require('fs')
const co = require('co')

/** @lends readJson */
function readJson (filename, callback) {
  return co(function * () {
    let data = yield new Promise((resolve, reject) =>
      fs.readFile(filename, (err, content) =>
        err ? reject(err) : resolve(content)
      )
    )
    return JSON.parse(String(data))
  })
}

module.exports = readJson

