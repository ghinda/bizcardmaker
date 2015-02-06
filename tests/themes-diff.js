/*
 * Generate a HTML file with all the 
 */

var mediaDir = './tests/media/';
var themesDir = 'themes-orig';
var themesOrigDir = 'themes-orig';
var themesFile = mediaDir + '/themes.html';

var fs = require('fs');

var stream = fs.createWriteStream(themesFile);
var html = '';

// build markup
fs.readdir(mediaDir + themesOrigDir, function(err,files){
    
  if(err) throw err;
           
  files.forEach(function(filename){
    
    html += '<img src="' + themesOrigDir + '/' + filename + '" class="img-orig">';
    html += '<img src="' + themesDir + '/' + filename + '" class="img">';
    
  });
  
  html += '<script src="themes.js"></script>';
  html += '<script src="resemble.js"></script>';
  
  stream.write(html);
  stream.end();
  
});

