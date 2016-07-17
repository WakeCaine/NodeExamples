var express = require('express');
var basicAuth = require('basic-auth-connect');
var app = express();
var auth = basicAuth(function(user, pass) {
  return (user === 'testuser' && pass === 'test');
});
app.get('/library', function(req,res){
  res.send('Witaj w bibliotece');
});
app.get('/restricted', auth, function(req,res) {
  res.send('Witaj w sekcji ograniczonej');
});
app.listen(80);
