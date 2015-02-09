/* using mocha programatically so we don't need to use 
 * the cli or a different runner for it
 */

var Mocha = require('mocha');
var path = require('path');

// First, you need to instantiate a Mocha instance.
var mocha = new Mocha({
  timeout: 20000
});

// Then, you need to use the method "addFile" on the mocha
// object for each file.

mocha.addFile('tests/themes/themes-diff.spec.js');

// Now, you can run the tests.
mocha.run(function(failures){
  process.on('exit', function () {
    process.exit(failures);
  });
});