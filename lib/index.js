/**
 * Dependency updating utility.
 * @module ape-updating
 */

'use strict'

const d = (module) => module && module.default || module

const updateDependencies = d(require('./update_dependencies'))

module.exports = {
  updateDependencies
}
