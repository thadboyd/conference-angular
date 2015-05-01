'use strict';

/* Controllers */

var conferenceControllers = angular.module('conferenceControllers', ['ngSanitize', 'mm.foundation']);

conferenceControllers.controller('TopBarCtrl', ['$scope', '$http',
  function($scope, $http) {
    $http.get('data/topnav.json').success(function(data) {
      $scope.topnav = data;
    });
  }]);

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

conferenceControllers.controller('ModalDemoCtrl', function ($scope, $modal, $log) {

  $scope.items = ['item1', 'item2', 'item3'];

  $scope.open = function () {

    var modalInstance = $modal.open({
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
});

conferenceControllers.controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});