/* Business Card Maker website
 */

(function() {
	'use strict';

	var showGuide = function() {
		// check if card editor page
		if($('.card-preview').length) {
			
			if($('.print-promo').length) {
				$('.print-promo').foundation('joyride', 'end');
			}

			$('.tutorial-tour').foundation('joyride', 'start');

			return false;
		}
	};
	
	// foundation properties
	$(document).foundation({
		joyride: {
			scroll_speed: 500
		}
	});

	$(document).ready(function() {
		$('.js-guide-btn').click(showGuide);
	});

})();

// print promo 
var showPrintpromo = function() {
	
	$('.print-promo').foundation('joyride', 'start');
	
};
