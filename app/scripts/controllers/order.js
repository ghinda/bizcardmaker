app.controller('OrderCtrl', function($rootScope, $scope, $routeParams, $location, $timeout, $q, data) {
	'use strict';

	var model = $scope.model || {};

	model.date = new Date();

	model.order = model.order || {};

	model.countries = [
		{
			name: 'USA',
			id: 'US'
		},
		{
			name: 'Canada',
			id: 'CA'
		}
	];

	model.order.country = model.countries[0];
	model.order.shippingDetailsType = 'same';
	model.order.selectedOffer = 0;

	model.regions = data.model.regions;

	data.GetOffers().then(function(offers) {
		model.offers = offers;
	});

	$scope.$watch('model.order.country', function() {
		model.order.region = model.regions[model.order.country.id][0];
	});

// 	var initDatepicker = function() {
//
// 		var $datepicker = $('.datepicker');
//
// 		new Pikaday({
// 			field: $datepicker.get(0),
// 			format: 'D MMM YYYY',
// 			onSelect: function() {
// 				console.log('wat');
// 			}
// 		});
//
// 	};
//
// 	initDatepicker();

});
