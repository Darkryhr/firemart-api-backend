const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customer: String,
  cart: String,
  price: Number,
  address: String,
  deliveryDate: Date,
  orderedAt: Date,
  creditCardDigits: Number,
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
