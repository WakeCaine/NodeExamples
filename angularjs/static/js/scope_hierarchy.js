angular.module('myApppp', []).
  controller('LevelA', function($scope) {
    $scope.title = "PoziomA";
    $scope.valueA = 1;
    $scope.inc =  function() {
      $scope.valueA++;
    };
  }).
  controller('LevelB', function($scope) {
    $scope.title = "PoziomB";
    $scope.valueB = 1;
    $scope.inc =  function() {
      $scope.valueB++;
    };
  }).
  controller('LevelC', function($scope) {
    $scope.title = "PoziomC";
    $scope.valueC = 1;
    $scope.inc =  function() {
      $scope.valueC++;
    };
  });
