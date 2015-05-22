'use strict';

/* Controllers */

var conferenceControllers = angular.module('conferenceControllers', ['ngSanitize', 'ui.mask', 'mm.foundation']);

conferenceControllers.controller('TopBarCtrl', ['$scope', '$http', '$location', '$anchorScroll',
  function($scope, $http, $location, $anchorScroll) {
    $http.get('data/topnav.json').success(function(data) {
      $scope.topnav = data;
    });
    $scope.isActive = function(viewLocation) {
      return viewLocation === $location.path();
    };
    $scope.scrollTo = function(key){
      var oldHash = $location.hash();
      $location.hash(id);
      $anchorScroll();
      // reset to oldHash to prevent any additional routing logic from kicking in
      $location.hash(oldHash);
    }
  }]);

conferenceControllers.controller('ScheduleCtrl', ['$scope', '$http', '$modal',
  function($scope, $http, $modal) {
    $scope.filter = 'all';
    $scope.toggleFilter = function(newFilter) {
      if($scope.filter == newFilter) {
	$scope.filter = 'all';
      } else {
	$scope.filter = newFilter;
      }
      return $scope.filter;
    };
    
    // 'days' must be defined directly in controller;
    // parsing from JSON creates race condition
    // that causes anchorScroll to fail.
    $scope.days = [
      {
	"id": "03-31",
	"header": "Tuesday, March 31, 2015",
	"schedule": [
	  {
	    "event": "breakfast",
	    "time": "7:00 AM - 8:00 AM",
	    "location": "Dining Hall",
	    "desc": "Breakfast"
	  },
	  {
	    "event": "registration",
	    "time": "7:00 AM - 6:00 PM",
	    "location": "Lobby",
	    "desc": "Registration open"
	  },
	  {
	    "event": "newman",
	    "time": "8:30 AM - 10:00 AM",
	    "location": "Room 42",
	    "desc": "Transitioning our company by awareness of functionality",
	    "category": "keynote"
	  },
	  {
	    "event": "campbell",
	    "time": "11:00 AM - 12:00 PM",
	    "location": "Room 23",
	    "desc": "Promoting viability",
	    "category": "ideas"
	  },
	  {
	    "event": "fletcher",
	    "time": "11:00 AM - 12:00 PM",
	    "location": "Hangar 18",
	    "desc": "Providing our supply chain with diversity",
	    "category": "lifecycle"
	  },
	  {
	    "event": "ebilchik",
	    "time": "11:00 AM - 12:00 PM",
	    "location": "Area 51",
	    "desc": "We will distill our identity through client-centric solutions",
	    "category": "chart"
	  },
	  {
	    "event": "steckler",
	    "time": "11:00 AM - 12:00 PM",
	    "location": "Area 51-A",
	    "desc": "At the end of the day we must monetize our assets",
	    "category": "lesson"
	  },
	  {
	    "event": "lunch",
	    "time": "12:00 PM - 1:30 PM",
	    "location": "Dining Hall",
	    "desc": "Lunch"
	  }
	]
      },{
	"id": "04-01",
	"header": "Wednesday, April 1, 2015",
	"schedule": [
	  {
	    "event": "breakfast",
	    "time": "7:00 AM - 8:00 AM",
	    "location": "Dining Hall",
	    "desc": "Breakfast"
	  },
	  {
	    "event": "finklestein",
	    "time": "8:30 AM - 10:00 AM",
	    "location": "Hank Hall",
	    "desc": "The fundamentals of change",
	    "category": "development"
	  },
	  {
	    "event": "macintosh",
	    "time": "8:30 AM - 10:00 AM",
	    "location": "Don Hall",
	    "desc": "Can you visualize a value-added experience?",
	    "category": "talk"
	  },
	  {
	    "event": "earley",
	    "time": "11:00 AM - 12:00 PM",
	    "location": "Harren Hall",
	    "desc": "Grow the business infrastructure and monetize our assets",
	    "category": "ideas"
	  }
	]
      },{
	"id": "04-02",
	"header": "Thursday, April 2, 2015",
	"schedule": [
	  {
	    "event": "breakfast",
	    "time": "7:00 AM - 8:00 AM",
	    "location": "Dining Hall",
	    "desc": "Breakfast"
	  },
	  {
	    "event": "spadowski",
	    "time": "8:30 AM - 10:00 AM",
	    "location": "In a van down by the river",
	    "desc": "Bringing to the table our capitalized reputation",
	    "category": "bonus"
	  },
	  {
	    "event": "finklestein",
	    "time": "8:30 AM - 10:00 AM",
	    "location": "Sector 7G",
	    "desc": "Proactively overseeing day-to-day operations",
	    "category": "lifecycle"
	  },
	  {
	    "event": "newman",
	    "time": "11:00 AM - 12:00 PM",
	    "location": "Room 101",
	    "desc": "Services and deliverables with cross-platform innovation",
	    "category": "keynote"
	  }
	]
      }
    ]
    
    $http.get('data/categories.json').success(function(data) {
      $scope.categories = data;
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

conferenceControllers.controller('RegisterCtrl', ['$scope', '$modal',
  function($scope, $modal) {    
    $scope.master = {};
    
    $scope.update = function(user) {
      $scope.master = angular.copy(user);
    };

    $scope.reset = function() {
      $scope.user = angular.copy($scope.master);
      
      // Initialize registration to false instead of Undefined
      $scope.user.reg0331 = false;
      $scope.user.reg0401 = false;
      $scope.user.reg0402 = false;
      
      $scope.numDays = 0;
      $scope.ticketPrice = 0;
      $scope.tax = 0;
      $scope.totalPrice = 0;
    };

    $scope.reset();
    
    $scope.calcPrice = function() {
      $scope.numDays = (+$scope.user.reg0331) + (+$scope.user.reg0401) + (+$scope.user.reg0402);      
      
      if($scope.numDays == 1) {
	$scope.ticketPrice = 100;
      } else if($scope.numDays == 2) {
	$scope.ticketPrice = 175;
      } else if($scope.numDays == 3) {
	$scope.ticketPrice = 225;
      } else {
	$scope.ticketPrice = 0;
      }
      
      $scope.tax = $scope.ticketPrice * 0.06;
      $scope.totalPrice = $scope.ticketPrice + $scope.tax;
      
      return $scope.totalPrice;
    }
    
    $scope.submit = function(form) {
      if(form.$valid && $scope.numDays > 0) {
	$scope.submitted = true;
      } else {
	$scope.submitted = false;
      }
      return $scope.submitted;
    }
    
    $scope.open = function(options) {
      var modalInstance = $modal.open({
	templateUrl: 'modal_form',
	controller: 'ModalInstanceCtrl',
	resolve: {
	  data: function() {
	    return options;
	  }
	}
      })};
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
