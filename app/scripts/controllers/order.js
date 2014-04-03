app.controller('OrderCtrl', function($rootScope, $scope, $routeParams, $location, $timeout, $q, data) {
	'use strict';

	var model = $scope.model || {};

	model.order = model.order || {};
	model.shipping = {};

	model.order.card = {
		number: '',
		exp: '',
		csc: '',
		type: ''
	};
	
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
	model.order.shippingDetailsCustom = false;
	model.order.selectedOffer = 0;
	
	model.shipping.country = model.countries[0];

	model.regions = data.model.regions;

	data.GetOffers().then(function(offers) {
		model.offers = offers;
	});

	$scope.$watch('model.order.country', function() {
		model.order.region = model.regions[model.order.country.id][0];
	});
	
	$scope.$watch('model.shipping.country', function() {
		model.shipping.region = model.regions[model.shipping.country.id][0];
	});
	
	$scope.$watch('model.order.shippingDetailsType', function() {
		if(model.order.shippingDetailsType === 'custom') {
			model.order.shippingDetailsCustom = true;
		} else {
			model.order.shippingDetailsCustom = false;
		}
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
