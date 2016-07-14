var events = require('events');
function CarShow(){
	events.EventEmitter.call(this);
	this.seeCar = function(make){
		this.emit('sawCar', make);
	};
}
CarShow.prototype.__proto__ = events.EventEmitter.prototype;
var show = new CarShow();
function logCar(make){
	console.log("Widziano samochód. Marka: " + make);
}
function logColorCar(make,color){
	console.log("Widziano samochód. Kolor: %s Marka: %s", color, make);
}
show.on("sawCar", logCar);
show.on("sawCar", function(make){
	var colors = ['czerwony', 'niebieski', 'czarny'];
	var color = colors[Math.floor(Math.random()*3)];
	logColorCar(make,color);
});
show.seeCar("Ferrari");
show.seeCar("Ferrari1");
show.seeCar("Ferrari2");
show.seeCar("Ferrari3");
show.seeCar("Ferrari4");