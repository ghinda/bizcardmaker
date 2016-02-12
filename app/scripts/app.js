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
});

