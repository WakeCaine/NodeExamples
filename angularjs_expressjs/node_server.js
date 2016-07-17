var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use('/', express.static('./static')).
    use('/images', express.static('./images')).
    use('lib', express.static('./lib'));
app.use(bodyParser());
var days = ['Poniedzialek', 'Wtorek', 'Sroda', 'Czwartek', 'Piatek'];
var serviceDays = days.slice(0);
app.get('/reset/days', function(req,res){
    serviceDays = days.slice(0);
    res.json(serviceDays);
});
app.post('/remove/day', function(req,res){
    if(serviceDays.length > 2){
        serviceDays.splice(serviceDays.indexOf(req.body.day), 1);
        console.log(days);
        res.json(serviceDays);
    } else {
        res.status(400).json({msg:'Wymagane jest pozostawienie 2 dni'});
    }
});
app.listen(80);
