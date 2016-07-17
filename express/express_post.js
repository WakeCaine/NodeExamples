var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser());
app.get('/', function(req,res) {
  var response = '<form method = "POST">' +
      'Imię: <input type="text" name="first"><br>' +
      'Nazwisko: <input type="text" name="last"><br>' +
      '<input type="submit" value="Wyślij"></form>';
  res.send(response);
});
app.post('/', function(req,res) {
  var response = '<form method="POST">' +
      'Imię: <input type="text" name="first"><br>' +
      'Nazwisko: <input type="text" name="last"><br>' +
      '<input type="submit" value="Wyślij"></form>' +
      '<h1>Witaj, ' + req.body.first + '</h1>';
  res.type('html');
  res.end(response);
  console.log(req.body);
});
app.listen(80);
