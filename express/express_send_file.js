var express = require('express');
var url = require('url');
var app = express();
app.listen(80);
app.get('/image', function(req,res){
	res.sendFile('SC.png',
	{
		maxAge: 1,
		root: './views/'
	},
	function(err){
		if(err){
			console.log(err + "Błąd");
		} else {
			console.log("Powodzenie");
		}
	});
});