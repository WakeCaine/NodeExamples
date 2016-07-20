var crypto = require('crypto');
var express = require('express');
module.exports = function(app) {
  var users = require('./controllers/users_controller');
  var _book = require('./controllers/book_controller');
  var _genre = require('./controllers/genre_controller');
  var _cart = require('./controllers/cart_controller');
  app.use('/static', express.static('./static')).
      use('/lib', express.static('./lib')).
      use('/images', express.static('./images')).
      use('/fonts', express.static('./fonts'));

  //GET
  app.get('/', function(req,res) {
    if(req.session.user){
      res.render('index', {username: req.session.username,
                          msg: req.session.msg, logged: req.session.logged});
    } else {
      res.render('index', {username: null,
                          msg: '', logged: false});
    }
  });
  app.get('/bookstore', function(req, res){
	   res.render('book_site');
  });
  app.get('/user', function(req,res) {
    if(req.session.user){
      res.render('user', {msg: req.session.msg});
    } else {
      req.session.msg = 'Odmowa dostępu!';
      res.redirect('#/login');
    }
  });
  app.get('/logout', function(req,res) {
    req.session.destroy(function() {
      res.redirect('/');
    });
  });
  app.get('/user/profile', users.getUserProfile);

  app.get('/api/genres', function(req, res){
  	_genre.getGenres(function(err, genres){
  		if(err){
  			throw err;
  		}
  		res.json(genres);
  	 });
  });
  app.get('/api/books', function(req, res){
  	_book.getBooks(function(err, books){
  		if(err){
  			throw err;
  		}
  		res.json(books);
  	});
  });
  app.get('/api/books/:_id', function(req, res){
  	_book.getBookById(req.params._id, function(err, book){
  		if(err){
  			throw err;
  		}
  		res.json(book);
  	});
  });

  //POST
  app.post('/api/login', users.login);
  app.post('/api/signup', users.signup);
  app.post('/user/update', users.updateUser);
  app.post('/user/delete', users.deleteUser);

  app.post('/api/books', function(req, res){
  	var book = req.body;
  	_book.addBook(book, function(err, book){
  		if(err){
  			throw err;
  		}
  		res.json(book);
  	});
  });
  app.post('/api/cart', function(req, res){
  	var cart = req.body;
  	_cart.addBook(cart, function(err, cart){
  		if(err){
  			throw err;
  		}
  		res.json(cart);
  	});
  });
  app.post('/api/genres', function(req, res){
  	var genre = req.body;
  	_genre.addGenre(genre, function(err, genre){
  		if(err){
  			throw err;
  		}
  		res.json(genre);
  	});
  });
  //PUT
  app.put('/api/books/:_id', function(req, res){
  	var id = req.params._id;
  	var book = req.body;
  	_book.updateBook(id, book, {}, function(err, book){
  		if(err){
  			throw err;
  		}
  		res.json(book);
  	});
  });
  app.put('/api/genres/:_id', function(req, res){
  	var id = req.params._id;
  	var genre = req.body;
  	_genre.updateGenre(id, genre, {}, function(err, genre){
  		if(err){
  			throw err;
  		}
  		res.json(genre);
  	});
  });
  //DELETE
  app.delete('/api/books/:_id', function(req, res){
    var id = req.params._id;
    _book.removeBook(id, function(err, book){
      if(err){
        throw err;
      }
      res.json(book);
    });
  });
  app.delete('/api/genres/:_id', function(req, res){
  	var id = req.params._id;
  	_genre.removeGenre(id, function(err, genre){
  		if(err){
  			throw err;
  		}
  		res.json(genre);
  	});
  });
}
