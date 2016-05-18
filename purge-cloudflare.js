'use strict';

var https = require('https');
var apiHost = 'api.cloudflare.com'
var apiUrl = '/client/v4'
var headers = {
  'Content-Type': 'application/json'
}
var zone

function getZone (callback) {
  var postReq = https.request({
    host: apiHost,
    path: apiUrl + '/zones',
    method: 'GET',
    headers: headers
  }, function(res) {
    res.setEncoding('utf8');
    var data = ''
    res.on('data', function (d) {
      data += d
    })

    res.on('end', function () {
      zone = JSON.parse(data).result[0]

      callback()
    });
  });

  postReq.end();
}

function purgeCloudflareCache (callback) {
  var postData = JSON.stringify({
    purge_everything: true
  })

  headers['Content-Length'] = Buffer.byteLength(postData)

  var postReq = https.request({
    host: apiHost,
    path: apiUrl + '/zones/' + zone.id + '/purge_cache',
    method: 'DELETE',
    headers: headers
  }, function(res) {

    res.setEncoding('utf8');
    var data = ''
    res.on('data', function (chunk) {
      data += chunk
    });

    res.on('end', function () {
      console.log(data)
      callback()
    })
  });

  // post the data
  postReq.write(postData);
  postReq.end();
};

module.exports = function (grunt) {
  var deployConfig = grunt.file.readJSON('deploy.json');
  headers['X-Auth-Key'] = deployConfig.cloudflare.key;
  headers['X-Auth-Email'] = deployConfig.cloudflare.email;

  return function (callback) {
    getZone(function () {
      purgeCloudflareCache(callback)
    })
  }
}
