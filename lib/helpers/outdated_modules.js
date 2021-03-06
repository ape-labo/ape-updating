/**
 * Get outdatedModules
 */
'use strict'

const { execSync } = require('child_process')
const { EOL } = require('os')

/** @lends outdatedModules */
function outdatedModules () {
  let outdated
  try {
    outdated = execSync('npm outdated')
  } catch (e) {
    let { stdout } = e
    outdated = String(stdout)
  }
  return outdated
    .toString()
    .split(EOL)
    .slice(1)
    .filter((line) => !!line)
    .map((line) => line.trim())
    .map((line) => {
      let [ name, current, wanted, latest, location ] = line.split(/\s+/g)
      return { name, current, wanted, latest, location }
    })
    .reduce((result, outdated) => Object.assign(result, {
      [outdated.name]: outdated
    }), {})
}

module.exports = outdatedModules
