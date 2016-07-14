var url = require('url');
var urlStr = 'http://użytkownik:hasło@host.com:80/zasób/ścieżka?zapytanie=łańcuch#położenie_fragmentu_zasobu';
var urlObj = url.parse(urlStr, true, false);
urlString = url.format(urlObj);
console.log(urlString);

var http = require('http');
var options = {
	hostname: 'www.mojserwer.com',
	path: '/',
	port: '8080',
	method: 'POST'
};

try{
	var req = http.request(options, function(response){
		var str = '';
		response.on('data', function (chunk){
			str += chunk;
		});
		response.on('end', function(){
			console.log(str);
		});
	});
	req.end();
}catch(err){
	console.log(err);
	console.log("Nothing to see here");
}