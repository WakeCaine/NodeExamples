function simpleTimeout( consoleTimer ){
	console.timeEnd(consoleTimer);
}

console.time( "dwieSekundy" );
setTimeout( simpleTimeout, 2000, "dwieSekundy" );
console.time( "jednaSekunda" );
setTimeout( simpleTimeout, 1000, "jednaSekunda" );
console.time( "pięćSekund" );
setTimeout( simpleTimeout, 5000, "pięćSekund" );
console.time( "50milisekund" );
setTimeout( simpleTimeout, 50, "50milisekund" );
