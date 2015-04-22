'use strict';

/* Controllers */

var conferenceApp = angular.module('conferenceApp', ['ngSanitize', 'mm.foundation']);

conferenceApp.controller('AgendaCtrl', ['$scope', '$http', function($scope, $http) {
  $http.get('data/categories.json').success(function(data) {
    $scope.categories = data;
  });
  $http.get('data/days.json').success(function(data) {
    $scope.days = data;
  });
  $http.get('data/events.json').success(function(data) {
    $scope.events = data;
  });
}]);

conferenceApp.controller('CreditCtrl', ['$scope', '$http', function($scope, $http) {
  $http.get('data/credits.json').success(function(data) {
    $scope.credits = data;
  });
}]);
