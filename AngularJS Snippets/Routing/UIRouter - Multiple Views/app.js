var app = angular.module("UIRouterApp", ["ui.router"]);

/* Multiple views */
app.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state("board", {
			url: "/boards",
			views: {
				"board1": {
					templateUrl: "templates/board1.html"
				},
				"board2": {
					templateUrl: "templates/board2.html"
				}
			}
		});
});