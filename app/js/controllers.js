'use strict';

/* Controllers */

var conferenceApp = angular.module('conferenceApp', ['ngSanitize']);

conferenceApp.controller('AgendaCtrl', ['$scope', '$http', function($scope, $http) {
  $http.get('data/categories.json').success(function(data) {
    $scope.categories = data;
  });
  $http.get('data/days.json').success(function(data) {
    $scope.days = data;
  });
}]);

conferenceApp.controller('CreditCtrl', ['$scope', '$http', function($scope, $http) {
  $http.get('data/credits.json').success(function(data) {
    $scope.credits = data;
  });
}]);