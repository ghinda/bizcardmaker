/* fileread directive
 * for uploading files
 */

app.directive('drag', ['$document', function ($document) {
	'use strict';

	return {
		link: function (scope, element) {
			var startX = 0, startY = 0, x = 0, y = 0;
			var dragHandle = element.find('.drag-handle');
			
			var containerWidth = $('.card-content').width();
			var containerHeight = $('.card-content').height();
			var containerX = $('.card-content').offset().left;
			var containerY = $('.card-content').offset().top;
			var maxX = containerX + containerWidth;
			var maxY = containerY + containerHeight;

			console.log(maxX);
			console.log(maxY);

			
			dragHandle.on('mousedown', function (e) {
				e.preventDefault();
				startX = e.pageX - x;
				startY = e.pageY - y;

				$document.on('mousemove', mousemove);
				$document.on('mouseup', mouseup);
			});

			var mousemove = function (e) {
				x = e.pageX - startX;
				y = e.pageY - startY;
				
				if (x + element.width() < maxX) {
					if ( x%10 == 0) { element.css('left', x); }	
				}
				
				if (y + element.height() < maxY) {
					if ( y%10 == 0) { element.css('top', y); }
				}
			};

			var mouseup = function () {
				$document.unbind('mousemove', mousemove);
				$document.unbind('mouseup', mouseup);
			};
		}
	};
}]);
