var express = require('express');
var app = express();
function queryRemover(req,res,next){
  console.log("\nPrzed zmodyfikowaniem URL: ");
  console.log(req.url);
  req.url = req.url.split('?')[0];
  console.log("\nPo zmodyfikowaniu adresu URL: ");
  console.log(req.url);
  next();
};
app.use(queryRemover);
app.get('/no/query', function (req,res) {
  res.send("test");
});
app.listen(80);
