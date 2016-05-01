/**
 * ape framework module for updating modules.
 * @module ape-updating
 */

'use strict'

let d = (module) => module.default || module

module.exports = {
  get updateDependencies () { return d(require('./update_dependencies')) }
}
