/**
 * Write package.json data.
 * @function _writeJson
 * @param {string} filename - File name to write.
 * @param {object} data - Json data to save.
 * @returns {Promise}
 */

'use strict'

const fs = require('fs')
const co = require('co')

/** @lends _writeJson */
function _writeJson (filename, data) {
  return co(function * () {
    let content = JSON.stringify(data, null, 2)
    yield new Promise((resolve, reject) =>
      fs.writeFile(filename, content, (err) =>
        err ? reject(err) : resolve()
      )
    )
  })
}

module.exports = _writeJson
