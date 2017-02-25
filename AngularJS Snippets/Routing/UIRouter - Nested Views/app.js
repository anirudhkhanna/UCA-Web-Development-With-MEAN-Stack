var app = angular.module("UIRouterApp", ["ui.router"]);

/* Single nested view */
app.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state("board1", {
			url: "/board1",
			templateUrl: "templates/board1.html"
		})
		.state("board1.notes", {
			templateUrl: "templates/board1-notes.html"
		})
		.state("board1.details", {
			templateUrl: "templates/board1-details.html"
		})
		.state("board2", {
			url: "/board2",
			templateUrl: "templates/board2.html"
		})
});