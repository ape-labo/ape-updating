/**
 * Test case for updateDependencies.
 * Runs with mocha.
 */
'use strict'

const updateDependencies = require('../lib/update_dependencies.js')
const assert = require('assert')
const co = require('co')

describe('update-dependencies', () => {
  before((done) => {
    done()
  })

  after((done) => {
    done()
  })

  it('Update dependencies', () => co(function * () {
    let pkgPath = require.resolve('../doc/mocks/package.json')
    yield updateDependencies({
      pkgPath: pkgPath
    })
  }))
})

/* global describe, before, after, it */
