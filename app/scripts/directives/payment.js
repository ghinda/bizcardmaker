/* payment directive
 * wrapper around jquery.payment
 */

app.directive('payment', [function () {
	'use strict';

	return {
		scope: {
			payment: '@'
		},
		link: function (scope, element) {
			
			element.payment(scope.payment);
			
			// TODO validate on change payment
			
		}
	};
}]);
