var factApp = angular.module('d2vnFact', ['ngRoute']);

factApp.config(function($routeProvider) {
  $routeProvider
    .when('/', {
                templateUrl : 'views/home.html',
                controller  : 'mainController'
    })
    .when('/f/:factId', {
                templateUrl : 'views/fact.html',
                controller  : 'GetFact'
    });
});

factApp.controller('GetFact', function($scope, $routeParams, $window, LoadFact) {
    $scope.fact_ID = $routeParams.factId;
    LoadFact.GetData().success(function(data) {
      if ($scope.fact_ID == "random") {
         var randomFact = Math.floor(Math.random()*data.facts.length);
         $window.location.href = '/#/f/' + data.facts[randomFact].id; 
      } else {
        $scope.fexist = false;
        for (var i=0; i<=data.facts.length; i++) {
          if (data.facts[i].id == $scope.fact_ID) {
            $scope.fact = data.facts[i];
            $scope.fexist = true;
            break;
          }
        }
      }
    });
});

factApp.factory('LoadFact', function($http) {
  var factory = {};
  factory.GetData = function() {
    return $http.get('app/database/data.json');
  };
  return factory;
});