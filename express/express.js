var express = require('express');
var http = require('http');
var url = require('url');
var fs = require('fs');
var app = express();
http.createServer(app).listen(80);
app.get('/', function(req, res) {
	res.send('Witaj w komponencie Express');
});
app.get('/login', function(req, res) {
	res.send('Logowanie');
});
app.get('/save', function(req, res) {
	res.send('Zapis');
});
app.get('/find', function(req,res) {
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	res.send('Szukanie książki - autor: ' + query.author + ' Tytuł: ' + query.title);
});
app.get(/^\/book\/(\w+)\:(\w+)?$/,function(req,res){
	res.send('Uzyskiwanie ksiązki - rozdział: ' + req.params[0] + ' Strona: ' + req.params[1]);
});
app.get('/user/:userid', function(req,res){
	res.send("Uzyskiwanie użytkownika: " + req.param("userid"));
});
app.param('userid', function(req, res, next, value){
	console.log("Żądanie z identyfikatorem użytkownika: " + value);
	next();
});
app.get('/log/:id', function(req,res) {
	console.log("URL: 		" + req.orginalUrl);
	console.log("Protocol: 	" + req.protocol);
	console.log("IP: 		" + req.ip);
	console.log("Path: 		" + req.path);
	console.log("Host: 		" + req.host);
	console.log("Method: 	" + req.method);
	console.log("Query: 	" + JSON.stringify(req.query));
	console.log("Fresh:		" + req.fresh);
	console.log("Stale: 	" + req.stale);
	console.log("Secure: 	" + req.secure);
	console.log("UTF8: 		" + req.acceptsCharset('utf8'));
	console.log("Connection:" + req.get('connection'));
	console.log("Headers: 	" + JSON.stringify(req.headers, null, 2));
	res.send("User Request");

});
app.all('/save/*', function(req, res) {
	res.send('Get them all');
});
app.all('*', function(req, res) {
	res.send('Get thems all');
});