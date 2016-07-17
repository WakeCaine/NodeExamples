angular.module('myAppp', []).
  controller('SimpleTemplate', function($scope) {
    $scope.valueA = 15;
    $scope.valueB = 7;
    $scope.valueC = 12;
    $scope.addValues =  function(v1, v2) {
      var v = angular.$rootScope;
      $scope.valueC = v1 + v2;
    };
  });
