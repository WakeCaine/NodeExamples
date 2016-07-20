var mongoose = require('mongoose');

// Book Schema
var bookSchema = mongoose.Schema({
	title:{
		type: String,
		required: true
	},
	genre:{
		type: String,
		required: true
	},
	description:{
		type: String
	},
	author:{
		type: String,
		required: true
	},
	publisher:{
		type: String
	},
	pages:{
		type: String
	},
	image_url:{
		type: String
	},
	buy_url:{
		type: String
	},
	create_date:{
		type: Date,
		default: Date.now
	}
});
mongoose.model('Book', bookSchema);

var bookQuantitySchema = new Schema({
  quantity: Number,
  product: [bookSchema]
}, { _id: false });
mongoose.model('bookQuantity', bookQuantitySchema);
