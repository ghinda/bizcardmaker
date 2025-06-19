/* Business Card Maker app
*/

var app = angular.module('businessCardMaker', [
  'angular-meditor'
]);

app.run([ '$rootScope', function($rootScope){
  'use strict';

  $rootScope.root = {};
}]);

