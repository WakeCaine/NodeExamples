var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const mongoStore = require('connect-mongo')(expressSession);
var mongoose = require('mongoose');
require('./models/users_model.js');
require('./models/comments_model');
require('./models/photo_model');
require('./models/page_model');
var app = express();
const conn = mongoose.connect('mongodb://localhost:27017/myapp');
app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.use(bodyParser());
app.use(cookieParser());
app.use(expressSession({
  secret: 'SECRET',
  cookie: { maxAge: 60*60*1000},
  store: new mongoStore({
    mongooseConnection: conn.connection,
    collection: 'sessions'
  })
}));

require('./routes')(app);
var port = 80;
app.listen(port);
console.log('Started listening on ' + port);
