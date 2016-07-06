#!/usr/bin/env node

/**
 * Send reports.
 */

'use strict'

process.chdir(`${__dirname}/..`)

const { runTasks } = require('ape-tasking')
const apeReporting = require('ape-reporting')

runTasks('report', [
  (callback) => {
    apeReporting.sendToCodeclimate('coverage/lcov.info', callback)
  }
], true)
