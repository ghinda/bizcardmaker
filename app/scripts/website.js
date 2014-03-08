/* Business Card Maker website
 */

(function() {
	'use strict';

	var showGuide = function() {
		// check if card editor page
		if($('.card-preview').length) {

			$(document).foundation({
				joyride: {
					scroll_speed: 500
				}
			});

			$(document).foundation('joyride', 'start');

			return false;
		}
	};

	$(document).ready(function() {
		$('.js-guide-btn').click(showGuide);
	});

})();
