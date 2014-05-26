/* fileread directive
* for uploading files
*/

app.directive('fileread', [function () {
  'use strict';

  return {
    scope: {
      fileread: '='
    },
    link: function (scope, element) {
      element.bind('change', function (changeEvent) {
        scope.$apply(function () {
          scope.fileread = changeEvent.target.files[0];
          // or all selected files:
          // scope.fileread = changeEvent.target.files;
        });
      });
    }
  };
}]);
