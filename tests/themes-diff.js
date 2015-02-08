/*
 * Generate a HTML file with all the 
 */

var mediaDir = __dirname + '/media';
var themesDir = mediaDir + '/themes';
var themesOrigDir = mediaDir + '/themes-orig';
var themesDiffDir = mediaDir + '/themes-diff';

var fs = require('fs');
var gm = require('gm').subClass({ imageMagick: true });

var fileList = [];
var currentCount = 0;

var compareFile = function(filename, callback) {
  
  var diffFile = themesDiffDir + '/' + filename;

  var options = {
    file: diffFile,
    highlightColor: 'red',
    tolerance: 0.05
  };
  
  gm().compare(
    themesDir + '/' + filename,
    themesOrigDir + '/' + filename,
    options,
    function (err, isEqual, equality, raw) {
    
      console.log(isEqual);
      
      if(isEqual) {
        // remove the diff file if the images are the same
        fs.unlink(diffFile);
      }
      
      if(callback) {
        callback();
      }
      
    });
    
};

// compare one at a time
// so we don't freeze node
var compareNext = function() {
  
  if(currentCount < fileList.length) {
    compareFile(fileList[currentCount], compareNext);
    currentCount++;
  }
  
};

// build the file list
fs.readdir(themesOrigDir, function(err, files){
  
  if(err) throw err;
           
  files.forEach(function(filename){
    fileList.push(filename);
  });
  
  compareNext();
  
});
