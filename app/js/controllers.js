'use strict';

/* Controllers */

var conferenceControllers = angular.module('conferenceControllers', ['ngSanitize', 'mm.foundation']);

conferenceControllers.controller('TopBarCtrl', ['$scope', '$http', '$location',
  function($scope, $http, $location) {
    $http.get('data/topnav.json').success(function(data) {
      $scope.topnav = data;
    });
    $scope.isActive = function(viewLocation) {
      return viewLocation === $location.path();
    };
  }]);

conferenceControllers.controller('ScheduleCtrl', ['$scope', '$http', '$modal',
  function($scope, $http, $modal) {
    $http.get('data/categories.json').success(function(data) {
      $scope.categories = data;
    });
    $http.get('data/days.json').success(function(data) {
      $scope.days = data;
    });
    $http.get('data/events.json').success(function(data) {
      $scope.events = data;
    });
    
    $scope.open = function(options) {
      var modalInstance = $modal.open({
	templateUrl: 'modal_event',
	controller: 'ModalInstanceCtrl',
	resolve: {
	  data: function() {
	    return options;
	  }
	}
      })};    
  }]);

conferenceControllers.controller('SponsorsCtrl', ['$scope', '$http',
  function($scope, $http) {
    $http.get('data/sponsors.json').success(function(data) {
      $scope.sponsors = data;
    });
  }]);

conferenceControllers.controller('CreditCtrl', ['$scope', '$http', '$modal',
  function($scope, $http, $modal, $log) {
    $http.get('data/credits.json').success(function(data) {
      $scope.credits = data;
    });
    
    $scope.open = function(options) {
      var modalInstance = $modal.open({
	templateUrl: 'modal_credits',
	controller: 'ModalInstanceCtrl',
	resolve: {
	  data: function() {
	    return options;
	  }
	}
      })};    
  }]);

conferenceControllers.controller('ModalInstanceCtrl', function ($scope, $modalInstance, data) {
  $scope.data = data;
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});