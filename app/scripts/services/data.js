/*
 * Data service
 */

app.factory('data', function($rootScope, $http, $q) {

	var baseUrl = 'http://localhost:8080';

	// local data
	var data = {
		offers: []
	};

	// get list of offers
	var GetOffers = function(params) {
		var deferred = $q.defer();

// 		deferred.resolve('Hello, ' + name + '!');
// 		deferred.reject('Greeting ' + name + ' is not allowed.');

		return deferred.promise;
	};

	var SendOrder = function(params) {
		var deferred = $q.defer();

		// TODO upload blob
// 		var xhr = new XMLHttpRequest();
// 		xhr.open('POST', 'upload/binary/jpeg', true);
// 		xhr.setRequestHeader('Content-Type', 'image/jpeg');
// 		xhr.send(blob);

		$http.post(baseUrl + '/upload', {
			image: params.image
		}).success(function(response) {
			deferred.resolve(response);
		}).error(function(err) {
			deferred.reject(err);
		});

// 		deferred.resolve('Hello, ' + name + '!');
// 		deferred.reject('Greeting ' + name + ' is not allowed.');

		return deferred.promise;
	};

	return {
		GetOffers: GetOffers,
		SendOrder: SendOrder
	}
});
