/**
 * Read package.json data.
 * @function _readJson
 * @param {string} filename - Fie name to read.
 * @param {function} callback - Callback when done.
 */

"use strict";

var fs = require('fs'),
    async = require('async');

/** @lends _readJson */
function _readJson(filename, callback) {
    async.waterfall([
        function (callback) {
            fs.readFile(filename, callback);
        },
        function (data, callback) {
            callback(null, JSON.parse(String(data)));
        }
    ], callback);
}

module.exports = _readJson;
