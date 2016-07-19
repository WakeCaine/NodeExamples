angular.module('myApp',['ngRoute']).
	config(function($routeProvider){
		$routeProvider.when('/', {
			controller:'myController',
			templateUrl: 'static/books.html'
		})
		.when('/books', {
			controller:'myController',
			templateUrl: 'static/books.html'
		})
		.when('/books/details/:id',{
			controller:'myController',
			templateUrl: 'static/book_details.html'
		})
		.when('/books/add',{
			controller:'myController',
			templateUrl: 'static/add_book.html'
		})
		.when('/books/edit/:id',{
			controller: 'myController',
			templateUrl: 'static/edit_book.html'
		})
		.when('/login',{
			controller: 'myController',
			templateUrl: 'static/login.html'
		});
	});
