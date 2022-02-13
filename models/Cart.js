const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
  {
    customer: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: { createdAt: 'created_at' },
  }
);

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
