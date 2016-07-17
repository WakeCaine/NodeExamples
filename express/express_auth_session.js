var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var crypto = require('crypto');
function hashPW(pwd) {
  return crypto.createHash('sha256').update(pwd).digest('base64').toString();
}
var app = express();
app.use(bodyParser());
app.use(cookieParser('MAGICString'));
app.use(session());
app.get('/restricted', function(req,res) {
  if(req.session.user){
    res.send('<h2>' + req.session.success + '</h2>' +
              '<p>Uaktywniono sekcję ograniczoną<p><br>' +
              ' <a href="/logout">wyloguj się</a>');
  } else {
    req.session.error = 'Odmowa dostępu!';
    res.redirect('/login');
  }
});
app.get('/logout', function(req,res) {
  req.session.destroy(function() {
    res.redirect('/login');
  });
});
app.get('/login', function (req,res) {
  var response = '<form method="POST">' +
    'Nazwa uzytkownika: <input type="text" name="username"><br>' +
    'Hasło: <input type="password" name="password"><br>' +
    '<input type="submit" value="Wyślij"></form>';
    if(req.session.user){
      res.redirect('/restricted');
    } else if(req.session.error) {
      response += '<h2>' + req.session.error + '</h2>';
    }
    res.type('html');
    res.send(response);
});
app.post('/login', function(req,res) {
  var user = {name:req.body.username, password:hashPW("myPass")};
  if(user.password === hashPW(req.body.password.toString())){
    req.session.regenerate(function() {
      req.session.user = user;
      req.session.success = 'Uwierzetelniono jako ' + user.name;
      res.redirect('/restricted');
    });
  } else {
    req.session.regenerate(function() {
      req.session.error = 'Uwierzetelnianie nie powiodło się.';
      res.redirect('/restricted');
    });
  }
});
app.listen(80);
