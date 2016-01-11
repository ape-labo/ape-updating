#!/usr/bin/env node

/**
 * Measure test coverage.
 */

"use strict";

process.chdir(__dirname + '/..');

const apeTasking = require('ape-tasking'),
    apeCovering = require('ape-covering');

apeTasking.runTasks('cover', [
    (callback) => {
        apeCovering.measureCoverage('_mocha', [
            'test/*_test.js', '-t', 30000
        ], {
            dir: 'coverage'
        }, callback);
    }
], true);
