angular.module("classApp", [])

.controller("someController1", function($scope) {

	console.log("Inside someController1");

	$scope.name = "UCA";
	$scope.names = ["UCA1", "UCA2", "UCA3"];

	$scope.someFunction = function() {
		alert("Inside someController1");
	};
})

.controller("someController2", function() {

	this.shop = "Bakers' Paradise";
	this.shopkeepers = ["SK1", "SK2"];
})

.controller("someController3", function($scope) {
	$scope.shopkeepers = [
		{name: "Madhur", desc: "Best sweets and snacks.", isOpen: false},
		{name: "Mohan", desc: "From sweets to fast-food. Open 24x7.", isOpen: true},
		{name: "Kalika", desc: "Get home delivery of your favourite desert.", isOpen: false}
	];

	$scope.image = "images/Hydrangeas.jpg";
})

.controller("custDirController", function($scope) {
	$scope.val = "CustDirValue";
})

.directive("templateOne", function() {

	return {
		restrict: "A",
		/* template: "<h2>My template</h2>", */
		templateUrl:"templates/template-one.html",
		controller: "custDirController",
		controllerAs: "custDirCtrl"
	};
})

.directive("templateTwo", function() {

	return {
		/* template: "<h2>My another template</h2>", */
		templateUrl:"templates/template-two.html"
	};
})