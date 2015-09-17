/* Business Card Maker app
*/

var app = angular.module('businessCardMaker', [
  'ngRoute',
  'ngTouch',
  'angular-meditor'
]).config(function($routeProvider) {
  'use strict';

  $routeProvider
  .when('/', {
    templateUrl: 'views/cardeditor.html',
    controller: 'MainCtrl',
    reloadOnSearch: false
  }).otherwise({
    redirectTo: '/'
  });

});

app.run(function($rootScope){
  'use strict';

  var root = $rootScope.root = {};

  root.smallScreen = (screen.width <= 1024);

});

// Safari, in Private Browsing Mode, looks like it supports localStorage
// but all calls to setItem throw QuotaExceededError.
if (typeof localStorage === 'object') {
  try {
    localStorage.setItem('localStorage', 1);
    localStorage.removeItem('localStorage');
  } catch (e) {
    window.Storage.prototype._setItem = window.Storage.prototype.setItem;
    window.Storage.prototype.setItem = function() {};
  }
}
