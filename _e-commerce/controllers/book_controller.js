var mongoose = require('mongoose');
Book = mongoose.model('Book');
// Get Books
exports.getBooks = function(callback, limit){
	Book.find(callback).limit(10);
}
// Get Book
exports.getBookById = function(id, callback){
	Book.findById(id, callback);
}
// Add Book
exports.addBook = function(book, callback){
	Book.create(book, callback);
}
// Update Book
exports.updateBook = function(id, book, options, callback){
	var query = { _id: id};
	var update = {
		title: book.title,
		genre: book.genre,
		description: book.description,
		author: book.author,
		publisher: book.publisher,
		pages: book.pages,
		image_url: book.image_url,
		buy_url: book.buy_url
	}
	Book.findOneAndUpdate(query, update, options, callback);
}
// Delete Book
exports.removeBook = function(id, callback){
	var query = {_id: id};
	Book.remove(query, callback);
}
