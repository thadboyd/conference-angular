'use strict';

/* Controllers */

var conferenceControllers = angular.module('conferenceControllers', ['ngSanitize', 'mm.foundation']);

conferenceControllers.controller('ScheduleCtrl', ['$scope', '$http',
  function($scope, $http) {
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

conferenceControllers.controller('SponsorsCtrl', ['$scope', '$http',
  function($scope, $http) {
    $http.get('data/sponsors.json').success(function(data) {
      $scope.sponsors = data;
    });
  }]);

conferenceControllers.controller('CreditCtrl', ['$scope', '$http',
  function($scope, $http) {
    $http.get('data/credits.json').success(function(data) {
      $scope.credits = data;
    });
  }]);
