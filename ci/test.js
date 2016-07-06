#!/usr/bin/env node

/**
 * Run tests.
 */

'use strict'

process.chdir(`${__dirname}/..`)

const { runTasks } = require('ape-tasking')
const apeTesting = require('ape-testing')

runTasks('test', [
  () => apeTesting.runMocha('test/*_test.js', {
    timeout: 30000
  })
], true)
