angular.module('myAppEvents', []).
  controller('Characters', function($scope) {
    $scope.names = ['Frodo', 'Aragorn', 'Legolas', 'Gimli'];
    $scope.currentName = $scope.names[0];
    $scope.changeName =  function() {
      $scope.currentName = this.name;
      $scope.$broadcast('CharacterChanged', this.name);
    };
    $scope.$on('CharacterDeleted', function(event, removeName) {
      var i = $scope.names.indexOf(removeName);
      $scope.names.splice(i,1);
      $scope.currentName = $scope.names[0];
      $scope.$broadcast('CharacterChanged', $scope.currentName);
    });
  }).
  controller('Character', function($scope) {
    $scope.info = {'Frodo' : {weapon:'Ządło', race:'Hobbit'},
                  'Aragorn': {weapon:'Miecz', race:'Człowiek'},
                  'Legolas': {weapon:'Łuk', race:'Elf'},
                  'Gimli': {weapon:'Topor', race:'Krasnolud'}};
    $scope.currentInfo = $scope.info['Frodo'];
    $scope.$on('CharacterChanged', function(event, newCharacter) {
      $scope.currentInfo= $scope.info[newCharacter];
    });
    $scope.deleteChar = function() {
        delete $scope.info[$scope.currentName];
        $scope.$emit('CharacterDeleted', $scope.currentName);
    };
  });
