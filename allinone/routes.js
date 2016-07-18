var crypto = require('crypto');
var express = require('express');
module.exports = function(app) {
  var photos = require('./controllers/photos_controller');
  var comments = require('./controllers/comments_controller');
  var pages = require('./controllers/pages_controller');
  var users = require('./controllers/users_controller');
  app.use('/static', express.static('./static')).
      use('/lib', express.static('./lib')).
      use('/images', express.static('./images'));

  //GET
  app.get('/', function(req,res) {
    if(req.session.user){
      res.render('index', {username: req.session.username,
                          msg: req.session.msg});
    } else {
      req.session.msg = 'Odmowa dostępu!';
      res.redirect('/login');
    }
  });
  app.get('/user', function(req,res) {
    if(req.session.user){
      res.render('user', {msg: req.session.msg});
    } else {
      req.session.msg = 'Odmowa dostępu!';
      res.redirect('/login');
    }
  });
  app.get('/signup', function(req,res) {
    if(req.session.user){
      res.redirect('/');
    }
    res.render('signup', {msg:req.session.msg});
  });
  app.get('/login', function(req,res) {
    if(req.session.user){
      res.redirect('/');
    }
    res.render('login', {msg:req.session.msg});
  });
  app.get('/logout', function(req,res) {
    req.session.destroy(function() {
      res.redirect('/login');
    });
  });
  app.get('/user/profile', users.getUserProfile);
  //GET COMMENTS PART
  app.get('/photopage', function(req, res) {
    res.render('photos');
  })
  app.get('/photos', photos.getPhotos);
  app.get('/photo', photos.getPhoto);
  app.get('/page', pages.getPage);
  app.get('/comments/get', comments.getComment);

  //POST
  app.post('/comments/add', comments.addComment);
  app.post('/signup', users.signup);
  app.post('/user/update', users.updateUser);
  app.post('/user/delete', users.deleteUser);
  app.post('/login', users.login);
}
