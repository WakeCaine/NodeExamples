var express = require('express');
var url = require('url');
var app = express();
app.listen(80);
app.get('/json', function(req,res){
	app.set('json spaces', 4);
	res.json({
		name:"Smithsonian", built:'1846', items: '137M',
		centers: ['sztuka','astrofizyka','historia naturalna','planetarium',
		'biologia','kosmos','zoologia']
	});
});
app.get('/error', function(req,res){
	res.json(500, {status:false, message:"Błąd wewnętrzny serwera"});
});
app.get('/jsonp', function(req,res){
	app.set('jsonp callback name', 'cb');
	res.jsonp({
		name:"Smithsonian", built: '1846', items: '137M',
		centers: ['sztuka','astrofizyka','historia naturalna','planetarium',
		'biologia','kosmos','zoologia']
	})
});