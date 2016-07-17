angular.module('myAppFilters', []).
  controller('myController', function($scope) {
    $scope.JSONObj = {title:'myTitle'};
    $scope.word= "Superkalifragilisticeexpialidocious";
    $scope.days= ['Poniedzialek', 'Wtorek', 'Sroda', 'Czwartek', 'Piatek', 'Sobota','Niedziela'];
  });
