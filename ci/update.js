#!/usr/bin/env node

/**
 * Update project.
 */

'use strict'

process.chdir(`${__dirname}/..`)

const { runTasks } = require('ape-tasking')
const { updateDependencies } = require('../lib')

runTasks('update', [
  () => updateDependencies({})
], true)
