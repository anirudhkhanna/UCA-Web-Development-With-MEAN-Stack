var app = angular.module('meanApp');

app.controller('registerCtrl', function($location, authentication) {
	var vm = this;

	vm.credentials = {
		name: '',
		email: '',
		password: '',
		avatar: 'default-user-avatar-0.png'
	};

	vm.onSubmit = function() {
		authentication.register(vm.credentials)
			.error(function(err) {
				alert(err.message);
			})
			.then(function() {
				$location.path('profile');
			});
	};
});
