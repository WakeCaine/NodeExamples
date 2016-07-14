var express = require('express');
var url = require('url');
var app = express();
app.listen(80);
app.get('/', function(req,res){
	var response = '<html><head><title>Prosta operacja wysyłania</title></head>' + 
	'<body><h1>Powitanie z serwera Express</h1></body></html>';
	res.status(200);
	res.set({
		'Content-Type': 'text/html',
		'Content-Length': response.length
	});
	res.send(response);
	console.log('Czy odpowiedź została zakończona? ' + res.finished);
	console.log('\nWysyłane nagłówki: ');
	console.log(res.headersSent);
});
app.get('/error', function(req,res){
	res.status(404);
	res.send("To jest niepoprawne żądanie.");
})