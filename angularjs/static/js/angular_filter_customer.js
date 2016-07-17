angular.module('myAppFilterSortCustom', []).
  filter('censor', function () {
    return function (input, replacement) {
      var cWords = ['niedobry', 'niedobra', 'ponury', 'mroczny'];
      var out = input;
      for(var i=0; i<cWords.length; i++){
        out = out.replace(cWords[i], replacement);
      }
      return out;
    };
  }).
  controller('myController', ['$scope','censorFilter', function ($scope, censorFilter) {
    $scope.phrase="To jest niedobra fraza.";
    $scope.txt="Kliknij, aby odfiltrować wyrazy: mroczny i ponury.";
    $scope.filterText = function () {
      $scope.txt = censorFilter($scope.txt, '<<ocenzurowane>>');
    };
  }]);
