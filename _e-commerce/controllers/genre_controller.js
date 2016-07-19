var mongoose = require('mongoose');
Genre = mongoose.model('Genre');
// Get Genres
exports.getGenres = function(callback, limit){
	Genre.find(callback).limit(limit);
}
// Add Genre
exports.addGenre = function(genre, callback){
	Genre.create(genre, callback);
}
// Update Genre
exports.updateGenre = function(id, genre, options, callback){
	var query = {_id: id};
	var update = {
		name: genre.name
	}
	Genre.findOneAndUpdate(query, update, options, callback);
}
// Delete Genre
exports.removeGenre = function(id, callback){
	var query = {_id: id};
	Genre.remove(query, callback);
}
