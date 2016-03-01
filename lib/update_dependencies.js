/**
 * Update dependencies in package.json
 * @memberof module:ape-updating/lib
 * @function updateDependencies
 * @param {options} [options] - Optional settings.
 * @param {string} [options.pkgPath] - Package.json path.
 * @param {function} [callback] - Callback when done.
 */

"use strict";

const argx = require('argx'),
    path = require('path'),
    os = require('os'),
    async = require('async'),
    execcli = require('execcli'),
    colorprint = require('colorprint'),
    _writeJson = require('./_write_json'),
    _readJson = require('./_read_json');

/** @lends updateDependencies */
function updateDependencies(options, callback) {
    let args = argx(arguments);
    callback = args.pop('function') || argx.noop;
    options = args.pop('object') || {};

    let pkgPath = path.resolve(options.pkgPath || 'package.json');

    let cwd = path.dirname(pkgPath);
    async.waterfall([
        (callback) => {
            _readJson(pkgPath, callback);
        },
        (pkg, callback) => {
            let ignore = /^git/;
            let dependencies = _setAllProperty(pkg['dependencies'], '*', {ignore: ignore}),
                devDependencies = _setAllProperty(pkg['devDependencies'], '*', {ignore: ignore});
            pkg['dependencies'] = dependencies;
            pkg['devDependencies'] = devDependencies;
            async.series([
                (callback) => {
                    _writeJson(pkgPath, pkg, callback);
                },
                (callback) => {
                    let dependencyNames = Object.keys(dependencies).sort().filter(name => !/^@/.test(name));
                    colorprint.trace('dependencies to update:%s%s', os.EOL, dependencyNames);
                    let args = ['install'].concat(dependencyNames).concat(['--save']);
                    execcli('npm', args, {
                        cwd: path.dirname(pkgPath)
                    }, callback);
                },
                (callback) => {
                    let devDependencyNames = Object.keys(devDependencies).filter(name => !/^@/.test(name));
                    colorprint.trace('devDependencies to update:%s%s', os.EOL, devDependencyNames);
                    let args = ['install'].concat(devDependencyNames).concat(['--save-dev']);
                    execcli('npm', args, {cwd: cwd}, callback);
                }
            ], (err) => {
                if (err) {
                    callback(err);
                } else {
                    execcli('npm', ['install'], {cwd: cwd}, callback);
                }
            });
        }
    ], callback);
}

function _setAllProperty(obj, val, options) {
    options = options || {};
    let ignore = options.ignore;

    obj = obj || {};
    Object.keys(obj)
        .filter((key) => {
            let rejected = ignore && ignore.test(obj[key]);
            return !rejected;
        })
        .forEach((key) => {
            obj[key] = val;
        });
    return obj;
}

module.exports = updateDependencies;