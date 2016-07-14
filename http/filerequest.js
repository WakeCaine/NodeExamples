/*var fs = require('fs');
var http = require('http');
var url = require('url');
var ROOT_DIR = "//";
http.createServer(function (req, res) {
	var urlObj = url.parse(req.url, true, false);
	fs.readFile(ROOT_DIR + urlObj.pathname, function (err, data){
		if(err){
			res.writeHead(404);
			res.end(JSON.stringify(err));
			return;
		}
		res.writeHead(200);
		res.end(data);
	});
}).listen(8080);*/

var http = require('http');
var messages = [
	'Witaj, świecie',
	'Podstawowy serwer Node.js',
	'Powodzenia!!'];
	http.createServer(function (req, res){
		res.setHeader("Content-Type", "text/html");
		res.writeHead(200);
		res.write('<html><head><title>Prosty serwer HTTP</title></head>');
		res.write('<body>');
		for (var idx in messages){
			res.write('\n<h1>' + messages[idx] + '</h1>');
		}
		res.end('\n</body></html>');
	}).listen(8080);