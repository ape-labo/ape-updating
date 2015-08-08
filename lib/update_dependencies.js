/**
 * Update dependencies in package.json
 * @memberof module:ape-updating/lib
 * @function updateDependencies
 * @param {options} [options] - Optional settings.
 * @param {string} [options.pkgPath] - Package.json path.
 * @param {function} [callback] - Callback when done.
 */

"use strict";

var argx = require('argx'),
    path = require('path'),
    os = require('os'),
    async = require('async'),
    execcli = require('execcli'),
    colorprint = require('colorprint'),
    _writeJson = require('./_write_json'),
    _readJson = require('./_read_json');

/** @lends updateDependencies */
function updateDependencies(options, callback) {
    var args = argx(arguments);
    callback = args.pop('function') || argx.noop;
    options = args.pop('object') || {};

    var pkgPath = path.resolve(options.pkgPath || 'package.json');

    async.waterfall([
        function (callback) {
            _readJson(pkgPath, callback);
        },
        function (pkg, callback) {
            var dependencies = _setAllProperty(pkg['dependencies'], '*'),
                devDependencies = _setAllProperty(pkg['devDependencies'], '*');
            pkg['dependencies'] = dependencies;
            pkg['devDependencies'] = devDependencies;
            async.series([
                function (callback) {
                    _writeJson(pkgPath, pkg, callback);
                },
                function (callback) {
                    var dependencyNames = Object.keys(dependencies).sort();
                    colorprint.trace('dependencies to update:%s%s', os.EOL, dependencyNames);
                    var args = ['install'].concat(dependencyNames).concat(['--save']);
                    execcli('npm', args, {
                        cwd: path.dirname(pkgPath)
                    }, callback);
                },
                function (callback) {
                    var devDependencyNames = Object.keys(devDependencies).sort();
                    colorprint.trace('devDependencies to update:%s%s', os.EOL, devDependencyNames);
                    var args = ['install'].concat(devDependencyNames).concat(['--save-dev']);
                    execcli('npm', args, {
                        cwd: path.dirname(pkgPath)
                    }, callback);
                }
            ], function (err) {
                callback(err);
            });
        }
    ], callback);
}

function _setAllProperty(obj, val) {
    obj = obj || {};
    Object.keys(obj).forEach(function (key) {
        obj[key] = val;
    });
    return obj;
}

module.exports = updateDependencies;