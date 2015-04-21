'use strict';

/* Controllers */

var conferenceApp = angular.module('conferenceApp', []);

conferenceApp.controller('CategoryCtrl', ['$scope', '$http', function($scope, $http) {
  $http.get('data/categories.json').success(function(data) {
    $scope.categories = data;
  });

  
}]);
