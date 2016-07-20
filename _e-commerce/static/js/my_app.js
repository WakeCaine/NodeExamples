angular.module('myApp').config(function($logProvider){
  $logProvider.debugEnabled(true);
}).
  controller('myController', ['$cookieStore','$rootScope', '$scope', '$http', '$location', '$routeParams', '$route', '$log', function($cookieStore,$rootScope, $scope, $http, $location, $routeParams,$route, $log) {
		console.log('Controller loaded...');
		$scope.user = {};
		$rootScope.cart = $cookieStore.get('cart');
		if(!($rootScope.cart instanceof Array)){
			$rootScope.cart = [];
		}

		$scope.addToCart = function (product) {
			$log.debug('Adding?' + product._id);
			var found = false;
			$rootScope.cart = $cookieStore.get('cart');
			if(!($rootScope.cart instanceof Array)){
				$rootScope.cart = [];
			}
			$rootScope.cart.forEach(function (item) {
				if (item._id === product._id) {
					item.quantity++;
					$log.debug('Adding? ' + item.quantity);
					found = true;
				}
			});
			if (!found) {
				$rootScope.cart.push(angular.extend({quantity: 1}, product));
				$log.debug('Adding? ' + $rootScope.cart[0].quantity);
			}
			$cookieStore.put('cart', $rootScope.cart);
		};

		$scope.getCartPrice = function () {
			var total = 0;
			$rootScope.cart.forEach(function (product) {
				total += product.price * product.quantity;
			});
			return total;
		};

		$scope.checkout = function () {
			$rootScope.cart = [];
			$cookieStore.put('cart', []);
		};

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
						$log.debug(data);
		        $scope.user = {};
		        $scope.msg = data;
						$scope.errorUserName = data.errors.username;
		        $scope.errorPassword = data.errors.password;
	      });
		}
		$scope.signup = function() {
			$scope.log = $scope.user.username;
			$http({
    					url: '/api/signup',
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
						$log.debug('Im here fucker');
						$scope.errorRegistered = data.errorRegistered;
					}
	      }).
	      error(function(data, status, headers, config) {
						$log.debug('im here fucker' + data);
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
