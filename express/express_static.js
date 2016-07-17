var express = require('express');
var app = express();
app.use('/', express.static('./static',[ 'maxAge:1']));
app.use('/images', express.static(__dirname + '/images'));
app.listen(80);
