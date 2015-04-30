'use strict';

/* App Module */

var conferenceApp = angular.module('conferenceApp', [
  'ngRoute',
  'conferenceControllers'
]);

conferenceApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/schedule', {
        templateUrl: 'partials/schedule.html',
        controller: 'ScheduleCtrl'
      }).
      when('/about', {
        templateUrl: 'partials/about.html'
      }).
      otherwise({
        redirectTo: '/schedule'
      });
  }]);
