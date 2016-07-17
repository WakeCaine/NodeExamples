var express = require('express');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var app = express();
app.use(cookieParser());
app.use(cookieSession({secret: 'MAGICALEXPRESSLKEY'}));
app.get('/library', function(req,res) {
  console.log(req.cookies);
  if(req.session.restricted){
    res.send('Liczba wizyt w sekcji ograniczonej:' +
              req.session.restrictedCount);
  } else {
    res.send('Witaj w bibliotece.');
  }
});
app.get('/restricted', function(req,res) {
  req.session.restricted = true;
  if(!req.session.restrictedCount){
    req.session.restrictedCount = 1;
  } else {
    req.session.restrictedCount += 1;
  }
  res.redirect('/library');
});
app.listen(80);
