const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  product: String,
  amount: Number,
  price: Number,
  cart: String,
});

const CartItem = mongoose.model('CartItem', cartItemSchema);

module.exports = CartItem;
