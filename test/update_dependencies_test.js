/**
 * Test case for updateDependencies.
 * Runs with mocha.
 */
'use strict'

const updateDependencies = require('../lib/update_dependencies.js')
const assert = require('assert')

describe('update-dependencies', () => {
  before((done) => {
    done()
  })

  after((done) => {
    done()
  })

  it('Update dependencies', async () => {
    const pkgPath = require.resolve('../misc/mocks/package.json')
    await updateDependencies({
      pkgPath: pkgPath
    })
  })
})

/* global describe, before, after, it */
