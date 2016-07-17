angular.module('myAppBind', []).
  controller('myController', function ($scope) {
    $scope.colors = ['red','green','blue'];
    $scope.myStyle = {"background-color": 'blue'};
    $scope.days=['Poniedzialek', 'Wtorek', 'Sroda', 'Czwartek', 'Piatek'];
    $scope.msg= "Komunikat z modelu";
  });
