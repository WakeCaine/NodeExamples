var fs = require( "fs" );
fs.stat( "tick.js", function( err, stats ) {
	if( stats ) {
		console.log( "Plik nexttick.js istnieje" );
	}
});
setImmediate( function(){
	console.log("Wykonano natychmiastowy licznik czasu 1");
});
setImmediate( function(){
	console.log("Wykonano natychmiastowy licznik czasu 2");
});
process.nextTick(function(){
	console.log("Wykonano następny znacznik 1");
})
process.nextTick(function(){
	console.log("Wykonano następny znacznik 2");
})
