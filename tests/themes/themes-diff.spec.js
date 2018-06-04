/*
 * Generate a HTML file with all the
 */

var chai = require('chai')
chai.should();

var mediaDir = __dirname + '/../media';
var themesDir = mediaDir + '/themes';
var themesOrigDir = mediaDir + '/themes-orig';
var themesDiffDir = mediaDir + '/themes-diff';

var fs = require('fs');
var gm = require('gm').subClass({ imageMagick: true });

var fileList = fs.readdirSync(themesOrigDir);
var currentCount = 0;

// make sure we at least have an empty themes-diff folder
// or imageMagick will break
if(!fs.existsSync(themesDiffDir)){
    fs.mkdirSync(themesDiffDir);
}

var compareFile = function(filename, callback) {

  var diffFile = themesDiffDir + '/' + filename;

  var options = {
    file: diffFile,
    highlightColor: 'red',
    tolerance: 0.007
  };

  gm().compare(
    themesDir + '/' + filename,
    themesOrigDir + '/' + filename,
    options,
    function (err, isEqual, equality, raw) {

      if(err) {
        throw err;
      }

      if(isEqual === true) {
        // remove the diff file if the images are the same
        fs.unlinkSync(diffFile);
      }

      if(callback) {
        callback(isEqual);
      }

    });

};

describe('Theme diffing', function() {

  fileList.forEach(function(filename) {

    it(filename + ' should be identical', function(done){

      compareFile(filename, function(isEqual) {

        isEqual.should.equal(true);

        done();

      });

    });

  });

});
