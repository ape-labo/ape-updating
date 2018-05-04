/**
 * Write package.json data.
 * @function writeJson
 * @param {string} filename - File name to write.
 * @param {object} data - Json data to save.
 * @returns {Promise}
 */

'use strict'

const fs = require('fs')

/** @lends writeJson */
async function writeJson (filename, data) {
  const content = JSON.stringify(data, null, 2)
  await new Promise((resolve, reject) =>
    fs.writeFile(filename, content, (err) =>
      err ? reject(err) : resolve()
    )
  )
}

module.exports = writeJson
