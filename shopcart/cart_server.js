var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const conn = mongoose.connect('mongodb://localhost:27017/myapp');
require('./models/cart_model.js');
var app = express();
app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
require('./cart_routes')(app);

var port = 80;
app.listen(port);
console.log('Started listening on ' + port);
