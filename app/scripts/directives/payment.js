/* payment directive
 * wrapper around jquery.payment
 */

app.directive('payment', [function () {
	'use strict';

	return {
		require: 'ngModel',
		scope: {
			payment: '@',
			cardNumber: '=',
			cardType: '=',
			ngModel: '='
		},
		link: function (scope, elm, attrs, ctrl) {

			elm.payment(scope.payment);

			var validateNumber = function(val) {

				if(!val) {
					return false;
				}

				scope.cardType = $.payment.cardType(val);

				if($.payment.validateCardNumber(val)) {
					ctrl.$setValidity('payment', true);
				} else {
					ctrl.$setValidity('payment', false);
				}

			};

			var validateExpiry = function(val) {

				if(!val) {
					return false;
				}
				if($.payment.validateCardExpiry(elm.payment('cardExpiryVal'))) {
					ctrl.$setValidity('payment', true);
				} else {
					ctrl.$setValidity('payment', false);
				}

			};

			var validateSecurity = function(val) {

				if(!val) {
					return false;
				}

				if($.payment.validateCardCVC(val, scope.cardType)) {
					ctrl.$setValidity('payment', true);
				} else {
					ctrl.$setValidity('payment', false);
				}

			};

			if(scope.payment === 'formatCardNumber') {
				scope.$watch('ngModel', validateNumber);
			} else if(scope.payment === 'formatCardExpiry') {
				scope.$watch('ngModel', validateExpiry);
			} else if(scope.payment === 'formatCardCVC') {
				scope.$watch('ngModel', validateSecurity);
			}

		}
	};
}]);
