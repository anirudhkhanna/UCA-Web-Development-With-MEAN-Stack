
var app = angular.module('ngApp', []);

app.controller('placesController', function($http) {

	var vm = this;

	vm.query = {
	};

	vm.places = {
		results: []
	}

	vm.loadingFlag = false;
	vm.notificationFlag = false;
	vm.notificationMessage = '';

	vm.submitQuery = function() {

		vm.notificationFlag = false;

		if(!vm.query.address || !vm.query.address.length || !vm.query.type || !vm.query.type.length) {
			vm.showNotification('Please fill in all the details.');
			return;
		}

		console.log(vm.query.address);
		console.log(vm.query.type);

		vm.loadingFlag = true;
		vm.places.results = [];

		$http.post('/getplacesnearby', vm.query).then(function successCallback(response) {
			vm.loadingFlag = false;
			vm.places = response.data;
			console.log(vm.places);
		}, function errorCallback(err) {
			vm.loadingFlag = false;
			vm.showNotification(err.data.message);
		});
	};

	vm.showNotification = function(message) {

		vm.places = [];
		vm.loadingFlag = false;
		vm.notificationMessage = message;
		vm.notificationFlag = true;
	};
});
