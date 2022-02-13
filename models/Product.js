const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A product must have a name'],
    unique: true,
    trim: true,
    maxlength: [20, 'A products name cannot be longer than 20 characters'],
    minlength: [3, 'A products name cannot be shorter than 3 characters'],
  },
  category: String,
  price: {
    type: Number,
    required: [true, 'A product must have a price'],
  },
  image: String,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
