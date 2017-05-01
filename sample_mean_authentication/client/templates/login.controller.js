var app = angular.module('meanApp');

app.controller('loginCtrl', function($location, authentication) {
	var vm = this;

	vm.credentials = {
		email: '',
		password: ''
	};

	vm.onSubmit = function() {
		authentication.login(vm.credentials)
			.error(function(err) {
				alert(err.message);
			})
			.then(function() {
				$location.path('profile');
			});
	};
});
