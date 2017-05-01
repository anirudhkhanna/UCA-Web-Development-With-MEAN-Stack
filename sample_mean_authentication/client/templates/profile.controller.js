var app = angular.module('meanApp');

app.controller('profileCtrl', function($location, meanData) {
	var vm = this;

	vm.user = {
	};

	meanData.getProfile()
		.success(function(data) {
			vm.user = data;
		})
		.error(function(err) {
			console.log(err);
		});
});
