var app = angular.module('meanApp');

app.controller('navigationCtrl', function($location, authentication) {
	var vm = this;

	vm.isLoggedIn = authentication.isLoggedIn();

	vm.currentUser = authentication.currentUser();

	vm.logOut = function() {
		authentication.logout();
		$location.path('/');
	};
});
