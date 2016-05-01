/**
 * Update dependencies in package.json
 * @memberof module:ape-updating/lib
 * @function updateDependencies
 * @param {options} [options] - Optional settings.
 * @param {string} [options.pkgPath] - Package.json path.
 * @returns {Promise}
 */

'use strict'

const argx = require('argx')
const path = require('path')
const co = require('co')
const os = require('os')
const execcli = require('execcli')
const colorprint = require('colorprint')
const _writeJson = require('./_write_json')
const _readJson = require('./_read_json')

let deprecateCallbacks = () => console.warn('[ape-updating] Callback is now deprecated. Use promise interface instead.')

/** @lends updateDependencies */
function updateDependencies (options) {
  let args = argx(arguments)
  let callback = args.pop('function')
  options = args.pop('object') || {}

  let pkgPath = path.resolve(options.pkgPath || 'package.json')

  let cwd = path.dirname(pkgPath)
  return co(function * () {
    let pkg = yield _readJson(pkgPath)
    let ignore = /^git/
    let dependencies = _setAllProperty(pkg[ 'dependencies' ], '*', { ignore })
    let devDependencies = _setAllProperty(pkg[ 'devDependencies' ], '*', { ignore })
    pkg[ 'dependencies' ] = dependencies
    pkg[ 'devDependencies' ] = devDependencies
    yield _writeJson(pkgPath, pkg)
    {
      let dependencyNames = Object.keys(dependencies).sort().filter((name) => !/^@/.test(name))
      colorprint.trace('dependencies to update:%s%s', os.EOL, dependencyNames)
      let args = [ 'install' ].concat(dependencyNames).concat([ '--save' ])
      yield npm(args, { cwd })
    }
    {
      let devDependencyNames = Object.keys(devDependencies).filter((name) => !/^@/.test(name))
      colorprint.trace('devDependencies to update:%s%s', os.EOL, devDependencyNames)
      let devArgs = [ 'install' ].concat(devDependencyNames).concat([ '--save-dev' ])
      yield npm(devArgs, { cwd })
    }
    yield npm([ 'install' ], { cwd })
    if (callback) {
      deprecateCallbacks()
      callback()
    }
  }).catch((err) => {
    if (callback) {
      deprecateCallbacks()
      callback(err)
    }
    return Promise.reject(err)
  })
}

function npm (args, options) {
  return co(function * () {
    return yield new Promise((resolve, reject) =>
      execcli('npm', args, options, (err) => err ? reject(err) : resolve())
    )
  })
}

function _setAllProperty (obj, val, options) {
  options = options || {}
  let ignore = options.ignore

  obj = obj || {}
  Object.keys(obj)
    .filter((key) => {
      let rejected = ignore && ignore.test(obj[ key ])
      return !rejected
    })
    .forEach((key) => {
      obj[ key ] = val
    })
  return obj
}

module.exports = updateDependencies
