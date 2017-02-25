var app = angular.module("routeApp", ['ngRoute']);

app.config(function($routeProvider) {

	$routeProvider
		.when('/', {
			/* template: "<h2>Home page using template</h2>", */
			templateUrl: 'pages/home.html',
			controller: 'homeController'
		})
		.when('/about', {
			templateUrl: 'pages/about.html',
			controller: 'aboutController'
		})
		.when('/contact', {
			templateUrl: 'pages/contact.html',
			controller: 'contactController'
		})
	/*	.otherwise({
			templateUrl: 'pages/home.html',
			controller: 'homeController'
		});
	*/
		.otherwise({
			redirectTo: "/"
		});
});

app.controller("homeController", function($scope) {
	$scope.message = "Controller for home page!";
	console.log("Inside main route.");
});

app.controller("aboutController", function($scope) {
	$scope.message = "Controller for about page!";
	console.log("Inside about route.");
});

app.controller("contactController", function($scope) {
	$scope.message = "Controller for contact page!";
	console.log("Inside contact route.");
});