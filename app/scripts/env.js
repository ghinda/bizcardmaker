/* env globals
 */

// local testing urls
var printchompUrl = 'http://sandbox.printchomp.com';
var apiUrl = 'http://localhost:8080';
var env = 'local';

// dev
if(document.domain.indexOf('development.') !== -1) {
  env = 'dev';
}

// stage
if(document.domain.indexOf('staging.') !== -1) {
  env = 'stage';
}

// live
if(document.domain.indexOf('www.') !== -1) {
  env = 'live';
}

if(env === 'dev') {
  apiUrl = 'https://dev-bizcardmaker.rhcloud.com';
}

if(env === 'live' || env === 'stage') {
  apiUrl = 'https://live-bizcardmaker.rhcloud.com';
  printchompUrl = 'https://printchomp.com';
}
