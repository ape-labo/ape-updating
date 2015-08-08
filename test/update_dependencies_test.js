/**
 * Test case for updateDependencies.
 * Runs with nodeunit.
 */

var updateDependencies = require('../lib/update_dependencies.js');

exports['Update dependencies'] = function (test) {
    var pkgPath = require.resolve('../docs/mockups/package.json');
    updateDependencies({
        pkgPath: pkgPath
    }, function (err) {
        test.ifError(err);
        test.done();
    });
};

