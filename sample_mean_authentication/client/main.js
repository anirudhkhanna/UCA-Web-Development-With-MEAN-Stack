// app module creation
var app = angular.module('meanApp', ['ngRoute']);

function config($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			redirectTo: '/login'
		})
		.when('/register', {
			templateUrl: '/templates/register.view.html',
			controller: 'registerCtrl',
			controllerAs: 'vm'
		})
		.when('/login', {
			templateUrl: '/templates/login.view.html',
			controller: 'loginCtrl',
			controllerAs: 'vm'
		})
		.when('/profile', {
			templateUrl: '/templates/profile.view.html',
			controller: 'profileCtrl',
			controllerAs: 'vm'
		})
		.otherwise({
			redirectTo: '/profile'
		});

	// use the HTML5 History API
	$locationProvider.html5Mode(true);
}

function run($rootScope, $location, authentication) {
	$rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
		if($location.path() === '/profile' && !authentication.isLoggedIn())
			$location.path('/');
	});

	$rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
		if($location.path() === '/login' && authentication.isLoggedIn())
			$location.path('/profile');
	});

	$rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
		if($location.path() === '/register' && authentication.isLoggedIn())
			$location.path('/profile');
	});
}

app.config(['$routeProvider', '$locationProvider', config])
	.run(['$rootScope', '$location', 'authentication', run]);
