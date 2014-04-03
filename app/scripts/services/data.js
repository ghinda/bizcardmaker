/*
 * Data service
 */

app.factory('data', function($rootScope, $http, $q) {

	var baseUrl = 'http://localhost:8080';

	// local model
	var model = {
		offers: []
	};

	// regions
	model.regions = {
		'US': [
			{"name":"Alabama","id":"AL"},
			{"name":"Alaska","id":"AK"},
			{"name":"Arizona","id":"AZ"},
			{"name":"Arkansas","id":"AR"},
			{"name":"California","id":"CA"},
			{"name":"Colorado","id":"CO"},
			{"name":"Connecticut","id":"CT"},
			{"name":"Delaware","id":"DE"},
			{"name":"District of Columbia","id":"DC"},
			{"name":"Florida","id":"FL"},
			{"name":"Georgia","id":"GA"},
			{"name":"Hawaii","id":"HI"},
			{"name":"Idaho","id":"ID"},
			{"name":"Illinois","id":"IL"},
			{"name":"Indiana","id":"IN"},
			{"name":"Iowa","id":"IA"},
			{"name":"Kansa","id":"KS"},
			{"name":"Kentucky","id":"KY"},
			{"name":"Lousiana","id":"LA"},
			{"name":"Maine","id":"ME"},
			{"name":"Maryland","id":"MD"},
			{"name":"Massachusetts","id":"MA"},
			{"name":"Michigan","id":"MI"},
			{"name":"Minnesota","id":"MN"},
			{"name":"Mississippi","id":"MS"},
			{"name":"Missouri","id":"MO"},
			{"name":"Montana","id":"MT"},
			{"name":"Nebraska","id":"NE"},
			{"name":"Nevada","id":"NV"},
			{"name":"New Hampshire","id":"NH"},
			{"name":"New Jersey","id":"NJ"},
			{"name":"New Mexico","id":"NM"},
			{"name":"New York","id":"NY"},
			{"name":"North Carolina","id":"NC"},
			{"name":"North Dakota","id":"ND"},
			{"name":"Ohio","id":"OH"},
			{"name":"Oklahoma","id":"OK"},
			{"name":"Oregon","id":"OR"},
			{"name":"Pennsylvania","id":"PA"},
			{"name":"Rhode Island","id":"RI"},
			{"name":"South Carolina","id":"SC"},
			{"name":"South Dakota","id":"SD"},
			{"name":"Tennessee","id":"TN"},
			{"name":"Texas","id":"TX"},
			{"name":"Utah","id":"UT"},
			{"name":"Vermont","id":"VT"},
			{"name":"Virginia","id":"VA"},
			{"name":"Washington","id":"WA"},
			{"name":"West Virginia","id":"WV"},
			{"name":"Wisconsin","id":"WI"},
			{"name":"Wyoming","id":"WY"}
		],
		'CA': [
			{
				"name":"Alberta",
				"id":"AB"
			},
			{
				"name":"British Columbia",
				"id":"BC"
			},
			{
				"name":"Manitoba",
				"id":"MB"
			},
			{
				"name":"New Brunswick",
				"id":"NB"
			},
			{
				"name":"Newfoundland",
				"id":"NL"
			},
			{
				"name":"Northwest Territories",
				"id":"NT"
			},
			{
				"name":"Nova Scotia",
				"id":"NS"
			},
			{
				"name":"Nunavut",
				"id":"NU"
			},
			{
				"name":"Ontario",
				"id":"ON"
			},
			{
				"name":"Prince Edward Island",
				"id":"PE"
			},
			{
				"name":"Quebec",
				"id":"QC"
			},
			{
				"name":"Saskatchewan",
				"id":"SK"
			},
			{
				"name":"Yukon Territory",
				"id":"YT"
			}
		]
	};

	// get list of offers
	var GetOffers = function(params) {
		var deferred = $q.defer();

// 		deferred.resolve('Hello, ' + name + '!');
// 		deferred.reject('Greeting ' + name + ' is not allowed.');

		deferred.resolve([
			{
				title: 'Offer 1',
				price: '$300'
			},
			{
				title: 'Offer 2',
				price: '$200'
			},
			{
				title: 'Offer 3',
				price: '$100'
			},
			{
				title: 'Offer 4',
				price: '$50'
			}
		]);

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
		model: model,
		GetOffers: GetOffers,
		SendOrder: SendOrder
	}
});
