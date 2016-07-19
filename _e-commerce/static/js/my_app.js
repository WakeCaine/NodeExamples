angular.module('myApp').
  controller('myController', ['$scope', '$http', '$location', '$routeParams', '$route', '$log', function($scope, $http, $location, $routeParams,$route, $log) {
		console.log('Controller loaded...');
		$scope.user = {};
    $scope.getBooks = function(){
			$http.get('/api/books').success(function(response){
				$scope.books = response;
			});
		}
    $scope.getBook = function(){
			var id = $routeParams.id;
			$http.get('/api/books/'+id).success(function(response){
				$scope.book = response;
			});
		}

		$scope.addBook = function(){
			console.log($scope.book);
			$http.post('/api/books/', $scope.book).success(function(response){
				window.location.href='#/books';
			});
		}

		$scope.updateBook = function(){
			var id = $routeParams.id;
			$http.put('/api/books/'+id, $scope.book).success(function(response){
				window.location.href='#/books';
			});
		}

		$scope.removeBook = function(id){
			$http.delete('/api/books/'+id).success(function(response){
				window.location.href='#/books';
			});
		}
		$scope.login = function() {
			$scope.log = $scope.user.username;
			$http({
    					url: '/api/login',
    					method: "POST",
    					data: $scope.user,
    					headers: {'Content-Type': 'application/json'}
						}).
	      success(function(data, status, headers, config) {
					if (data.errors) {
		        $scope.user = {};
		        $scope.msg = data;
						$scope.errorUserName = data.errors.username;
		        $scope.errorPassword = data.errors.password;
					} else {
						window.location.href='/';
					}
	      }).
	      error(function(data, status, headers, config) {
						console.log(data);
		        $scope.user = {};
		        $scope.msg = data;
						$scope.errorUserName = data.errors.username;
		        $scope.errorPassword = data.errors.password;
	      });
		}
  }]).directive('flexslider', function () {

  return {
    link: function (scope, element, attrs) {

      element.flexslider({
        animation: "slide",
				controlNav: "thumbnails"
      });
    }
  }
});
