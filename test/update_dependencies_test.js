/**
 * Test case for updateDependencies.
 * Runs with mocha.
 */
"use strict";

const updateDependencies = require('../lib/update_dependencies.js'),
    assert = require('assert');

describe('update-dependencies', () => {

    before((done) => {
        done();
    });

    after((done) => {
        done();
    });


    it('Update dependencies', (done) => {
        var pkgPath = require.resolve('../doc/mocks/package.json');
        updateDependencies({
            pkgPath: pkgPath
        }, function (err) {
            assert.ifError(err);
            done();
        });
    });
});

