/* Business Card Maker app
*/

var app = angular.module('businessCardMaker', [
  'ngRoute',
  'angular-meditor'
]);

app.run([ '$rootScope', function($rootScope){
  'use strict';

  var root = $rootScope.root = {};
}]);

