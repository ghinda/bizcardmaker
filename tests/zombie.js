var Browser = require('zombie');

// We call our test example.com
Browser.localhost('localhost', 9000);

// Load the page from localhost
var browser = Browser.create();
browser.visit('/')
.then(function() {
  
  //return browser.pressButton('Download files');
  return 'ok';
  
})
.done(function() {
  // Form submitted, new page loaded.
  browser.assert.success();
  //browser.assert.text('title', 'Welcome To Brains Depot');
});
