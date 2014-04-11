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
			id: 'United States'
		},
		{
			name: 'Canada',
			id: 'Canada'
		}
	];

	model.error = '';
	model.orderLoading = false;
	model.orderSuccess = false;

	model.order.country = model.countries[0];
	model.order.shippingDetailsType = 'same';
	model.order.shippingDetailsCustom = false;
	model.order.selectedOffer = 0;
	
	model.shipping.country = model.countries[0];

	model.regions = data.model.regions;
	
	$scope.ImageUrl = function(url) {
		return data.printchompUrl + url;
	}

	data.GetOffers().then(function(offers) {
		model.offers = offers.offers;
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
	
	$scope.SendOrder = function() {
		
// 			order: {
// 				billing: {
// 					name:   'John Doe',
// 					phone: '15192223333',
// 					address: {
// 						street:      '123 Main St.',
// 						street2:     '',
// 						city:        'Springfield',
// 						region:      'KY',
// 						country:     'United States',
// 						postal_code: '40069'
// 					},
// 					amount: {
// 						subtotal:  1000,
// 						tax1:         0, 
// 						tax2:         0,
// 						shipping:     0, 
// 						total:     1000,
// 						currency: 'CAD'
// 					},
// 					credit_card: {
// 						number:       4030000010001234,
// 						verification: 123,
// 						expiry: {
// 							month: 6, 
// 							year:  2016
// 						}
// 					}
// 				},
// 				shipping:  {
// 					name:   'John Doe',
// 					phone: '15192223333',
// 					address: {
// 						street:      '123 Main St.',
// 						street2:     '',
// 						city:        'Springfield',
// 						region:      'KY',
// 						country:     'United States',
// 						postal_code: '40069'
// 					}
// 				}
// 			}
// 		};
		
		// make sure form is valid
		if(!$scope.orderForm.$valid) {
			return false;
		}
		
		var orderData = {};
		
		// generate base64 picture
		$scope.generatePicture().then(function(canvas) {

			// send the canvas as a b64 jpeg
			var jpegUrl = canvas.toDataURL('image/jpeg');
			orderData.image = jpegUrl;
			
			// user details
			orderData.user = {
				email: model.order.email,
				name: model.order.name
			};
			
			// billing details
			orderData.billing = {};
			orderData.billing.name = model.order.name;
			orderData.billing.phone = model.order.phone;
			
			// billing address
			orderData.billing.address = {};
			orderData.billing.address.city = model.order.city;
			orderData.billing.address.region = model.order.region.id;
			orderData.billing.address.country = model.order.country.id;
			orderData.billing.address.postal_code = model.order.postcode;
			orderData.billing.address.street = model.order.address1;
			orderData.billing.address.street2 = model.order.address2 || '';
			
			// offer details
			orderData.billing.amount = angular.copy(model.offers[model.order.selectedOffer].amount);
			
			orderData.offer = {};
			orderData.offer.id = model.offers[model.order.selectedOffer].id;
			
			// payment details
			orderData.billing.credit_card = {};
			orderData.billing.credit_card.number = model.order.card.number.replace(/ /g, '');
			orderData.billing.credit_card.verification = model.order.card.csc;
			
			var exp = model.order.card.exp.replace(/ /g, '').split('/');
			orderData.billing.credit_card.expiry = {};
			orderData.billing.credit_card.expiry.month = exp[0];
			orderData.billing.credit_card.expiry.year = exp[1];
			
			// shipping details
			orderData.shipping = {};
			if(model.order.shippingDetailsCustom) {
				
				orderData.shipping.name = model.shipping.name;
				orderData.shipping.phone = model.shipping.phone;
				
				orderData.shipping.address = {};
				orderData.shipping.address.city = model.shipping.city;
				orderData.shipping.address.region = model.shipping.region.id;
				orderData.shipping.address.country = model.shipping.country.id;
				orderData.shipping.address.postal_code = model.shipping.postcode;
				orderData.shipping.address.street = model.shipping.address1;
				orderData.shipping.address.street2 = model.shipping.address2 || '';
				
			} else {
				
				orderData.shipping.name = orderData.billing.name;
				orderData.shipping.phone = orderData.billing.phone;
				orderData.shipping.address = orderData.billing.address;
				
			}
		
			model.orderLoading = true;
		
			data.SendOrder(orderData).then(function(response) {
				console.log('success', response);
				
				model.orderLoading = false;
				
				model.error = '';
				model.orderSuccess = true;
				
				$timeout(function() {
					$('#modal-order').foundation('reveal', 'close');
				}, 5000);
				
			}, function(err) {
				
				console.log('error', err);
				
				model.error = err.error;
				model.orderLoading = false;
			});
			
		});
		
		return false;
		
	};

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
