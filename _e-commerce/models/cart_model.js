var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
require('./users.js');
var AddressSchema = new Schema({
  name: String,
  address: String,
  city: String,
  state: String,
  zip: String
});
mongoose.model('Address', AddressSchema);
var BillingSchema = new Schema({
    cardtype: { type: String, enum: ['Visa', 'MasterCard', 'Amex'] },
    name: String,
    number: String,
    expiremonth: Number,
    expireyear: Number,
    address: [AddressSchema]
});
mongoose.model('Billing', BillingSchema);
var ProductSchema = new Schema({
  name: String,
  imagefile: String,
  description: String,
  price: Number,
  instock: Number
});
mongoose.model('Product', ProductSchema);
var OrderSchema = new Schema({
  userid: String,
  items: [ProductQuantitySchema],
  shipping: [AddressSchema],
  billing: [BillingSchema],
  status: {type: String, default: "Pending"},
  timestamp: { type: Date, default: Date.now }
});
mongoose.model('Order', OrderSchema);
var CustomerSchema = new Schema({
  user: [mongoose.model('User').schema],
  shipping: [AddressSchema],
  billing: [BillingSchema],
  cart: [ProductQuantitySchema]
});
mongoose.model('Customer', CustomerSchema);
