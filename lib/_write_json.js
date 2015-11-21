/**
 * Write package.json data.
 * @function _writeJson
 * @param {string} filename - File name to write.
 * @param {object} data - Json data to save.
 * @param {function} callback - Callback when done.
 */

"use strict";

const fs = require('fs'),
    async = require('async');

/** @lends _writeJson */
function _writeJson(filename, data, callback) {
    async.waterfall([
        (callback) => {
            var content = JSON.stringify(data, null, 2);
            callback(null, content);
        },
        (content, callback) => {
            fs.writeFile(filename, content, callback);
        }
    ], callback);
}

module.exports = _writeJson;
