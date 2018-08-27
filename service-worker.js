/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["404.html","0ee7f4808599a5785f68814a81f370b6"],["about.html","f74a47fa243d3c2b3e092f3dfa42aae0"],["bower_components/font-awesome/css/font-awesome.css","8e12157da5fc90094ae4113ba110456b"],["bower_components/font-awesome/fonts/FontAwesome.otf","668743fe7258676f8ef8f9b47d2a623e"],["bower_components/font-awesome/fonts/fontawesome-webfont.eot","45c73723862c6fc5eb3d6961db2d71fb"],["bower_components/font-awesome/fonts/fontawesome-webfont.svg","76a4f23c6be74fd309e0d0fd2c27a5de"],["bower_components/font-awesome/fonts/fontawesome-webfont.ttf","7c87870ab40d63cfb8870c1f183f9939"],["bower_components/font-awesome/fonts/fontawesome-webfont.woff","dfb02f8f6d0cedc009ee5887cc68f1f3"],["bower_components/font-awesome/fonts/fontawesome-webfont.woff2","4b5a84aaf1c9485e060c503a0ff8cadb"],["contact.html","39a8969ef7bbb4d5747b97290c5b13cc"],["faq.html","a010e803cc178a200c13d86f153c2170"],["images/05407e43.discover.png","1a1618bb6fbbd55b8ede597f45078240"],["images/15d3313b.amex.png","94b87a4fb9e6d76bca1cd5b2c097bd7b"],["images/1c615d83.bizcardmaker-logo.png","3662d30f3ea2b5c361ed7ae011985705"],["images/269af3a4.ssl-seal.png","30209ac61e662baf284af432f92dc72e"],["images/27ac7977.chrome-app.png","060b85e0f4005f63c38f497fe99f114a"],["images/36b606d4.psprint-logo.png","9fafec0906ff2e17efcf384b25ca2827"],["images/51a2a106.creditcard-cvc.png","deb15424da9814edab4d8dfce9d68eec"],["images/6b05c353.social-promo-banner.png","44367f69afb32d162a03bc65514461b3"],["images/6c9cf65c.logo-logaster.png","76495006b8979f6508845e789f6b1931"],["images/945f018b.mastercard.png","fd7db61b7b9d8bcf1e0cd430b1aecc14"],["images/banner-social.png","fde8c14bbd77a593be883f94b0458c30"],["images/blog/0203aad4.icon-new-themes.png","b3e8b807fe516da09cdd6722223fa687"],["images/blog/05e82d8e.icon-chat.png","66de6e5ec68694dfa9f7969ed222ce0c"],["images/blog/21cc7e3e.post-picture-october.png","efe24ea45caf03f942db91d0743c869e"],["images/blog/28ca53db.icon-cdn.png","4525247fb4fc3db71c71e42404dc9342"],["images/blog/28f869fb.theme-new-city-lights.jpg","95768ec0f33999fa0a47d5df423fd03f"],["images/blog/435ab4f2.icon-new-ui.png","091af63dcd59a51dd33afed23ac83ef2"],["images/blog/43dc8eb7.post-picture-september.png","f75a6501064ebbca6c9f7caee96b1abb"],["images/blog/480c1c62.post-picture-februrary.png","33c1f14fb8bd4b639e734d79b9f4a90c"],["images/blog/5957db53.pdf-download-new.png","41f964eeb451a027e51a22a37c77ece7"],["images/blog/5ad0e61a.theme-new-space.jpg","b4979eab6d365e4392b80e478499e448"],["images/blog/6917b466.icon-shipping.png","cdfeaa3d1ce4db2752f32e935c35ae74"],["images/blog/69ef3570.post-picture-auto-save.png","565e76369d59cfeccd6b4c98db09237e"],["images/blog/7a558ccd.theme-new-autumn.png","5a7ee31393cb3e9ff76560f97d83a112"],["images/blog/83971dae.icon-lower-prices.png","c97f8bfffd3e4f7eb7f80523b7bc2037"],["images/blog/c5c1040d.post-picture-default.png","228309c13dd76fb3969e572901dda3d1"],["images/blog/e0c12145.post-picture-pdf-download.png","7e8e587c50a617c2edd8c79f51148863"],["images/blog/f1e3f7b6.theme-new-line.png","1c4dd638ff7e2534227120d66b9cee24"],["images/d84dab78.visa.png","c48e103e5c2588c56af1e7e5e11971d7"],["images/themes/0a156dbf.winter2.jpg","e4c3a83f3ccd8517e1e2c1f984f424df"],["images/themes/2425de7d.stardust.png","81bd6cdf3df8d40a7eb2100d60dc1147"],["images/themes/2b22e46e.space.jpg","a680e71b7582605172f62ff405022b1d"],["images/themes/38e26696.winter.jpg","91eebe3e752e996b10b0194be6a73f3e"],["images/themes/80cd7ffe.food.png","013677de5ebc506aa9be7a7ce9955ee6"],["images/themes/980787b2.school.png","3d3992779e81746c8f9e51e5fcfe11d6"],["images/themes/9f4fa917.city.jpg","d10d38f94a6f1c160a5da0c2727a6a46"],["images/themes/b9da87bc.restaurant.png","1b45c2e7c69e265ff0576ca60105a58a"],["images/themes/cf96a055.winter3.jpg","f45ecd5a9f3d2b75cf1c5fc33c739381"],["images/themes/efb374ab.diagonals.png","da6fd3fb2299140af059abe1cafc50cc"],["index.html","8ef5a6553295dbc6dee213f367add647"],["privacy.html","fb328b646249717283dfec0a751aeb50"],["scripts/app.js","543340d9c013acaa9b6195e54eac03c1"],["scripts/plugins.js","e8bcf6ecaf8d208bd722187bfb346b94"],["scripts/website.js","c468236311872e2775ff3d1bfa904afc"],["styles/e9d339d5.website.css","2b3bb1740bfcb59051a9790d3642e336"]];
var cacheName = 'sw-precache-v3-bizcardmaker-' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^v/];



var addDirectoryIndex = function(originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function(originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function(originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function(whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function(originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







