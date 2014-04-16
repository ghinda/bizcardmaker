/* fileread directive
 * for uploading files
 */

app.directive('drag', ['$document', function ($document) {
	'use strict';

	return {
		link: function (scope, element) {
			
			var dragHandle = element.find('.drag-handle');

			var mousemove = function (e) {
				console.log(e.pageX);
			};

			var mouseup = function () {
				
			};
			dragHandle.on('mousedown', function (e) {
				e.preventDefault();
				console.log('element', element.offset().left);
				console.log('e.pageX: ', e.pageX);
				console.log('e.pageY: ', e.pageY);

				$document.on('mousemove', mousemove);
				$document.on('mouseup', mouseup);
			});
		}
	};
}]);
