'use strict';

/* Controllers */

var conferenceControllers = angular.module('conferenceControllers', []);

conferenceControllers.controller('CategoryCtrl', ['$scope', '$http', function($scope, $http) {
  $http.get('data/categories.json').success(function(data) {
    $scope.categories = data;
  });
}]);

conferenceControllers.controller('CreditCtrl', ['$scope', '$http', function($scope, $http) {
  $http.get('data/credits.json').success(function(data) {
    $scope.credits = data;
  });
}]);

conferenceControllers.controller('CreditPartialCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams) {
    $scope.creditFile = $routeParams.id;
  }]);

conferenceControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams) {
    $scope.phoneId = $routeParams.phoneId;
  }]);
