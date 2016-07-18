angular.module('myApp', []).
  controller('myController', ['$scope', '$http', '$log', function($scope, $http, $log) {
    $scope.username = "fuck";
    $scope.error = "";
    $http.get('/user/profile').
      success(function(data, status, headers, config) {
        $scope.user = data;
        $scope.error = "";
      }).
      error(function(data, status, headers, config) {
        $scope.user = {};
        $scope.error = data;
      });
  }]);
