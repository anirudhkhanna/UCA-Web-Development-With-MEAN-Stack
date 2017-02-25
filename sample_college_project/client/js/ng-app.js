/* AngularJS code */

var app = angular.module("ngApp", ["ui.router"]);

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state("showstudents", {
    url: "/showstudents",
    templateUrl: "templates/showStudents.html"
  })
  .state("addstudent", {
    url: "/addstudent",
    templateUrl: "templates/addStudent.html"
  })
  .state("updatestudent", {
    url: "/updatestudent",
    templateUrl: "templates/updateStudent.html"
  })
  .state("deletestudent", {
    url: "/deletestudent",
    templateUrl: "templates/deleteStudent.html"
  })
});

app.controller("mainController", function() {
  // this.tab = 1;
  this.selectTab = function(selectedTab) {
    this.tab = selectedTab;
  };
});

app.controller("getstudentsController", function($http) {
  var college = this;
  $http.get('/student').then(function successCallback(response) {
        console.log("Inside success callback for getting all students.");
        college.students = response.data;
    }, function errorCallback(data) {
        console.log("Inside error callback for getting all students.");
    });
});

app.controller("addstudentController", function($http) {
  this.student = {};

  this.submitUserDetails = function() {
    $http.post('/student', this.student).then(function successCallback(response) {
          console.log("Inside success callback for adding a student.");
          console.log(response.data);
      }, function errorCallback(data) {
          console.log("Inside error callback for adding a student.");
      });

      this.student={};
  }
});

app.controller("updatestudentController", function($http) {
  this.student = {};

  this.submitUserDetails = function() {
    $http.put('/student/' + this.student.id, this.student).then(function successCallback(response) {
          console.log("Inside success callback for updating a student.");
          console.log(response.data);
      }, function errorCallback(data) {
          console.log("Inside error callback for updating a student.");
      });

      this.student={};
  }
});

app.controller("deletestudentController", function($http) {
  this.studentid;

  this.submitUserDetails = function() {
    $http.delete('/student/' + this.studentid).then(function successCallback(response) {
          console.log("Inside success callback for deleting a student.");
          console.log(response.data);
      }, function errorCallback(data) {
          console.log("Inside error callback for deleting a student.");
      });

      this.studentid = null;
  }
});
