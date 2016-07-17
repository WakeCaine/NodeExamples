var myMod = angular.module('myMod',[]);
myMod.value('modMsg','Powitanie z mojego modułu');
myMod.controller('controllerB', ['$scope','modMsg',function($scope,msg){
  $scope.message = msg;
}]);
var myApp = angular.module('myApp',['myMod']);
myApp.value('appMsg','Powitanie z mojej aplikacji');
myApp.controller('controllerA', ['$scope','appMsg',function($scope, msg) {
  $scope.message = msg;
}])
