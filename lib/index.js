/**
 * Dependency updating utility.
 * @module ape-updating
 */

'use strict'

let d = (module) => module && module.default || module

module.exports = {
  get updateDependencies () { return d(require('./update_dependencies')) }
}
