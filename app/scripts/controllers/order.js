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


  model.selectedSuggestion = 0;
  model.addressError = false;
  model.shippingAddressError = '';
  model.shippingRatesLoading = false;
  model.error = '';
  model.orderLoading = false;
  model.orderSuccess = false;

  model.orderData = {
    shipping: {}
  };

  model.order.country = model.countries[0];
  model.order.shippingDetailsType = 'same';
  model.order.shippingDetailsCustom = false;
  model.order.selectedOffer = false;

  model.shippingRates = [];
  model.selectedShippingRate = 0;

  model.shipping.country = model.countries[0];

  model.regions = data.model.regions;

  $scope.ImageUrl = function(url) {
    return data.printchompUrl + url;
  };

  var loadOffers = function() {
    data.GetOffers().then(function(offers) {
      model.offers = offers.offers;

      // select the first order
      model.order.selectedOffer = 0;
    }, function() {
      // in case the api is down
      // retry in 3s
      $timeout(loadOffers, 3000);
    });
  };

  loadOffers();

  $scope.$watch('model.order.country', function() {
    // if not changing automatically
    // from the address suggestions
    if(!model.addressError) {
      model.order.region = model.regions[model.order.country.id][0];
    }
  });

  $scope.$watch('model.shipping.country', function() {
    // if not changing automatically
    // from the address suggestions
    if(!model.addressError) {
      model.shipping.region = model.regions[model.shipping.country.id][0];
    }
  });

  $scope.$watch('model.order.shippingDetailsType', function() {
    if(model.order.shippingDetailsType === 'custom') {
      model.order.shippingDetailsCustom = true;
    } else {
      model.order.shippingDetailsCustom = false;
    }
  });

  // local testing
  if(data.env === 'local' || data.env === 'dev') {
    model.order.city = 'Florence';
    model.order.postcode = '35630';
    model.order.address1 = '110 West College Street';
    model.order.card.number = '4030000010001234';
    model.order.card.exp = '6 / 2016';
    model.order.card.csc = '123';
  }

  var parseAddress = function(model) {
    var address = {};

    address.city = model.city;
    address.region = model.region.id;
    address.country = model.country.id;
    address.postal_code = model.postcode;
    address.street = model.address1;
    address.street2 = model.address2 || '';

    return address;
  };

  $scope.SendOrder = function(event) {

    var $modalOrder = $('#modal-order');

    // scroll to modal top
    var scrollToModal = function() {
      $modalOrder[0].scrollIntoView(true);
    };

    // make sure the form is valid
    if(!$scope.orderForm.$valid) {

      // find the invalid field and focus it
      var firstInvalid = angular.element('#orderForm .ng-invalid');

      // get the field model
      var fieldModel = firstInvalid.attr('ng-model');

      var errorLabel = 'Invalid ' + fieldModel + ' order form field.';

      // track analytics
      ga('send', 'event', 'Orders', 'Invalid order form', errorLabel);

      // if we find one, set focus
      if (firstInvalid[0]) {
        firstInvalid[0].focus();
      }

      // prevent form submission
      return event.preventDefault();
    }

    model.orderLoading = true;

    // generate base64 picture
    model.orderData.image = model.imagePreview;

    // user details
    model.orderData.user = {
      email: model.order.email,
      name: model.order.name
    };

    // billing details
    model.orderData.billing = {};
    model.orderData.billing.name = model.order.name;
    model.orderData.billing.phone = model.order.phone;

    // billing address
    model.orderData.billing.address = parseAddress(model.order);

    // offer details
    model.orderData.billing.amount = angular.copy(model.offers[model.order.selectedOffer].amount);

    model.orderData.offer = {};
    model.orderData.offer.id = model.offers[model.order.selectedOffer].id;

    // payment details
    model.orderData.billing.credit_card = {};
    model.orderData.billing.credit_card.number = model.order.card.number.replace(/ /g, '');
    model.orderData.billing.credit_card.verification = model.order.card.csc;

    var exp = model.order.card.exp.replace(/ /g, '').split('/');
    model.orderData.billing.credit_card.expiry = {};
    model.orderData.billing.credit_card.expiry.month = exp[0];

    // if year is only two digits, prepend 20
    if(exp[1].length === 2) {
      exp[1] = '20' + exp[1];
    }

    model.orderData.billing.credit_card.expiry.year = exp[1];

    if(model.order.shippingDetailsCustom) {

      model.orderData.shipping.name = model.shipping.name;
      model.orderData.shipping.phone = model.shipping.phone;

      model.orderData.shipping.address = parseAddress(model.shipping);

    } else {

      model.orderData.shipping.name = model.orderData.billing.name;
      model.orderData.shipping.phone = model.orderData.billing.phone;
      model.orderData.shipping.address = model.orderData.billing.address;

    }

    if(model.addressError) {
      // address is selected from suggested addresses
      model.orderData.validate_address = false;
    } else {
      // validate address if not from suggested address
      model.orderData.validate_address = true;
    }

    model.addressError = false;

    // if shipping is not included
    if(model.shippingRates.length) {
      var rate = model.shippingRates[model.selectedShippingRate * 1];

      model.orderData.shipping.rate = {
        carrier: rate.carrier,
        service_code: rate.service_code
      };

      model.orderData.billing.amount.shipping = rate.price;
      model.orderData.billing.amount.total += rate.price;

      // set shipping_included=true
      // because we manually calculated the shipping and total prices
      model.orderData.billing.amount.shipping_included = true;

    }

    data.SendOrder(model.orderData).then(function() {

      // scroll to modal top
      // so the users sees the success messages
      scrollToModal();

      model.orderLoading = false;

      model.addressError = false;
      model.error = '';
      model.orderSuccess = true;

      // hide the modal in 5s
      $timeout(function() {
        $modalOrder.foundation('reveal', 'close');
      }, 5000);

      // track analytics
      ga('send', 'event', 'Orders', 'Successful order', model.orderData.offer.id);

      // subscribe to newsletter on successful order
      data.NewsletterSubscribe({
        email: model.order.email
      });

    }, function(err) {

      // scroll to top to see errors
      scrollToModal();

      model.orderLoading = false;

      if(err.addressError) {
        model.addressError = err.addressError;

        // track analytics
        ga('send', 'event', 'Orders', 'Address error');

      } else {

        model.error = err.error || 'Please try again later.';

        // track analytics
        ga('send', 'event', 'Orders', 'Order error', model.error);

      }


    });

    // scroll to top to see loading
    scrollToModal();

    // prevent form submission
    // for some weird reason, angular doesn't prevent submission automatically
    // only after I do a regular submit and a ? search param is set
    event.preventDefault();

  };

  $scope.ManualUpload = function() {

    $scope.$watch('model.manualUploadFile', function() {

      if(model.manualUploadFile) {

        var imageType = /image.*/;

        if (model.manualUploadFile.type.match(imageType)) {
          var reader = new FileReader();

          reader.onload = function() {

            $timeout(function() {
              model.imagePreview = reader.result;
            });

          };

          reader.readAsDataURL(model.manualUploadFile);

        }

      }

    });

  };

  // error message when trying to close the window
  // while order is in progress
  var TabCloseAlert = function(e) {
    if(model.orderLoading) {
      return 'Your order is currently in progress. Please wait for it to finish before closing the page. ';
    }
  };

  var debouncer;

  var getShippingRates = function() {

    if(debouncer) {
      $timeout.cancel(debouncer);
    }

    debouncer = $timeout(function() {

      model.shippingAddressError = '';

      // empty shipping rates
      model.shippingRates.length = 0;

      // reset selected shipping rate
      model.selectedShippingRate = 0;

      // local copy
      var selectedOffer = model.order.selectedOffer * 1;

      if(model.offers && model.offers.length) {

        var offer = model.offers[selectedOffer];

        if(!offer.amount.shipping_included) {

          // shipping not included
          var shippingRates = model.order;

          // check if we use a custom shipping address
          if(model.order.shippingDetailsCustom) {
            shippingRates = model.shipping;
          }

          model.shippingRatesLoading = true;

          // get shipping options
          data.GetShipping({
            offer: offer,
            address: parseAddress(shippingRates)
          })
          .then(function(res) {

            // act on the result only if
            // it's for the currently selected offer
            if(selectedOffer === model.order.selectedOffer) {
              model.shippingRates.length = 0;
              [].push.apply(model.shippingRates, res.rates);
            }

          })
          .catch(function(err) {

            model.shippingAddressError = err.error;

          })
          .finally(function() {

            model.shippingRatesLoading = false;

          });

        }

      }

    }, 500);

  };

  // watch for changes in addresses
  // and selected offers
  // to reload shipping rates
  $scope.$watchCollection('[' +
    'model.order.selectedOffer,' +

    'model.shipping.city,' +
    'model.shipping.region,' +
    'model.shipping.country,' +
    'model.shipping.postcode,' +
    'model.shipping.address1,' +
    'model.shipping.address2,' +

    'model.order.city,' +
    'model.order.region,' +
    'model.order.country,' +
    'model.order.postcode,' +
    'model.order.address,' +
    'model.order.address2,' +

    'model.order.shippingDetailsType' +
  ']', getShippingRates);


  // parse suggested address from the address error screen
  // to the proper order format to send
  $scope.$watch('model.selectedSuggestion', function() {

    if(model.addressError) {

      // set shipping details from address suggestions
      var validatedAddress = model.addressError.suggestions[model.selectedSuggestion];

      var addressComponent = {
        streetNumber: '',
        street: '',
        city: '',
        region: '',
        country: '',
        postal_code: ''
      };

      angular.forEach(validatedAddress.address_components, function(addr) {

        angular.forEach(addr.types, function(type) {

          if(type === 'street_number') {
            addressComponent.streetNumber = addr.long_name || addr.short_name;
            return false;
          }

          if(type === 'route') {
            addressComponent.street = addr.long_name || addr.short_name;
            return false;
          }

          if(type === 'locality') {
            addressComponent.city = addr.long_name || addr.short_name;
            return false;
          }

          if(type === 'administrative_area_level_1') {
            addressComponent.region = addr.short_name;
            return false;
          }

          if(type === 'country') {
            addressComponent.country = addr.long_name || addr.short_name;
            return false;
          }

          if(type === 'postal_code') {
            addressComponent.postal_code = addr.long_name || addr.short_name;
            return false;
          }

        });

      });

      // parse the address into the angular model format
      // not the api format
      // since we'll parse it again in SendOrder
      var parsedAddress = {};

      parsedAddress.city = addressComponent.city;

      // find the country and select it
      // we can't just set the id because it will look bad
      // when we return to the form with an address selected
      angular.forEach(model.countries, function(country) {
        if(country.id === addressComponent.country) {
          parsedAddress.country = country;
        }
      });

      // find the region and select it
      angular.forEach(model.regions[addressComponent.country], function(region) {
        if(region.id === addressComponent.region) {
          parsedAddress.region = region;
        }
      });

      parsedAddress.postcode = addressComponent.postal_code;
      parsedAddress.address1 = addressComponent.streetNumber + ' ' + addressComponent.street;
      parsedAddress.address2 = '';

      // check if shipping details are custom
      // and change either billing or shipping address
      if(model.order.shippingDetailsCustom) {
        angular.extend(model.shipping, parsedAddress);
      } else {
        angular.extend(model.order, parsedAddress);
      }

    }

  });

  window.onbeforeunload = TabCloseAlert;

});
