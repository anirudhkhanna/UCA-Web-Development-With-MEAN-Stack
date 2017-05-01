var app = angular.module('meanApp');

app.directive('navigation', function() {
	return {
		restrict: 'EA',
		templateUrl: 'directives/navigation.template.html',
		controller: 'navigationCtrl as navvm'
	};
});
