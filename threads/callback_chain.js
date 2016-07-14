function logCar(car, callback){
	console.log("Widziano samochód %s", car);
	if(cars.length){
		process.nextTick(function(){
			callback();
		});
	}
}
function logCars(cars){
	var car = cars.pop();
	logCar(car, function(){
		logCars(cars);
	});
}
var cars = ["Ferrari1", "Ferrari2", "Ferrari3", "Ferrari4", "Ferrari5", "Ferrari6"];
logCars(cars);