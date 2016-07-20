var crypto = require('crypto');
var mongoose = require('mongoose');
User = mongoose.model('User');
function hashPW(pwd) {
  return crypto.createHash('sha256').update(pwd).
                digest('base64').toString();
}
exports.signup = function(req, res) {
  var passerror = '';
  var usererror = '';
  if(req.body.password != req.body.repassword){
    req.session.regenerate(function() {
      req.body={};
      res.status(404).json({errors: { username: '', password: 'Passwords must be the same!'}});
    });
  }
  console.log('WTF:' + req.body.username);
  User.count({username: req.body.username}, function (err, docs) {
        console.log(err + docs);
        if (docs > 0){
          console.log('LOLWUT');
            usererror = 'Name exists already';
        }else{
          console.log(req.body);
          var user = new User({ username: req.body.username });
          user.set('hashed_password', hashPW(req.body.password));
          user.set('email', req.body.email);
          user.set('number', req.body.number);
          user.save(function(err) {
            if(err){
              usererror = 'Unknown error: ' + err;
            } else {
              req.session.regenerate(function() {
                req.body={};
                res.status(200).json({errorRegistered: 'Registered!'});
              });
            }
          });
        }
        console.log('WHAT21q3 ' + usererror + passerror);
        if(passerror != '' || usererror != ''){
          console.log('WHAT');
          req.session.regenerate(function() {
            req.body={};
            req.session.error = err;
            res.status(404).json({errors: { username: usererror, password: passerror}});
          });
        }
    });
};
exports.login = function(req, res) {
  console.log(req.body);
  User.findOne({ username: req.body.username }).
    exec(function(err, user) {
      var passerror = '';
      var usererror = '';
      if(!user){
        usererror = 'Nie znaleziono uzytkownika.';
      } else if (user.hashed_password === hashPW(req.body.password.toString())) {
        req.session.regenerate(function() {
          req.session.logged = true;
          req.session.user = user.id;
          req.session.username = user.username;
          req.session.msg = 'Uwierzetelniono jako ' + user.username;
          res.redirect('/');
        });
      } else {
        passerror = "Uwierzetelnianie nie powiodło się.";
      }
      if(passerror != '' || usererror != ''){
        req.session.regenerate(function() {
          req.session.msg = err;
          console.log('Error?');
          res.status(404).json({errors: { username: usererror, password: passerror}});
        });
      }
    });
};
exports.getUserProfile = function(req, res) {
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
