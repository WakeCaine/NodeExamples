var crypto = require('crypto');
var mongoose = require('mongoose');
User = mongoose.model('User');
function hashPW(pwd) {
  return crypto.createHash('sha256').update(pwd).
                digest('base64').toString();
}
exports.signup = function(req, res) {
  var user = new User({ username:req.body.username });
  user.set('hashed_password', hashPW(req.body.password));
  user.set('email', req.body.email);
  user.save(function(err) {
    if(err){
      req.session.error = err;
      res.redirect('/signup');
    } else {
      req.session.user = user.id;
      req.session.username = user.username;
      req.session.msg = 'Uwierzetelniono jako ' + user.username;
      res.redirect('/');
    }
  });
};
exports.login = function(req, res) {
  User.findOne({ username: req.body.username }).
    exec(function(err, user) {
      if(!user){
        err = 'Nie znaleziono uzytkownika.';
      } else if (user.hashed_password === hashPW(req.body.password.toString())) {
        req.session.regenerate(function() {
          req.session.user = user.id;
          req.session.username = req.body.username;
          req.session.msg = 'Uwierzetelniono jako ' + req.body.username;
          res.redirect('back');
          res.render('/logged',{username: req.session.username,
                              msg: req.session.msg, logged: true});
        });
      } else {
        err = "Uwierzetelnianie nie powiodło się.";
      }
      if(err){
        req.session.regenerate(function() {
          req.session.msg = err;
          res.redirect('/logged#/login');
        });
      }
    });
};
exports.getUserProfile = function(req, res) {
  console.log('FUG YOU');
  User.findOne({ _id: req.session.user }).
    exec(function(err, user) {
      if(!user){
        res.status(404).json({err: 'Nie znaleziono uzytkownika/'});
      } else {
        res.json(user);
      }
    });
};
exports.updateUser = function(req, res) {
  User.findOne({ _id: req.session.user }).
    exec(function(err, user) {
      user.set('email', req.body.email);
      user.set('color', req.body.color);
      user.save(function(err) {
        if(err){
          req.session.error = err;
        } else {
          req.session.msg = "Zaktualizowano uzytkownika.";
        }
        res.redirect('/user');
      });
    });
};
exports.deleteUser = function(req, res) {
  User.findOne({ _id: req.session.user }).
    exec(function(err, user) {
      if(user){
        user.remove(function(err) {
          if(err){
            req.session.msg = err;
          }
          req.session.destroy(function() {
            res.redirect('/login');
          });
        });
      } else {
        req.session.msg = "Nie znaleziono uzytkownika!";
        req.session.destroy(function() {
          res.redirect('/login');
        });
      }
    });
};
