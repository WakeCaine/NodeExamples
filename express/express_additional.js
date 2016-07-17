var express = require('express');
var app = express();
app.listen(80);
app.get('/', function(req, res){
    var id = req.query.id;
    var score = req.query.score;
    console.log(JSON.stringify(req.query));
    res.send("done");
});
