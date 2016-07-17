var firstApp = angular.module('firstApp', []);
firstApp.controller('FirstController', function($scope) {
  $scope.first = 'Imię';
  $scope.last = 'Nazwisko';
  $scope.heading = 'Komunikat: ';
  $scope.updateMessage = function() {
    $scope.message = 'Witaj, ' + $scope.first + ' ' + $scope.last + '!';
  };
});
