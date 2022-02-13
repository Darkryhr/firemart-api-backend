const catchAsync = require('../utils/catchAsync');
const Cart = require('../models/Cart');
const CartItem = require('../models/CartItem');

exports.addToCart = catchAsync(async (req, res, next) => {
  const cart = await Cart.find({ customer: req.user._id, active: true }).exec();
  const { amount, product, price } = req.body;
  const newItem = await CartItem.create({
    product,
    amount: amount,
    price: price,
    cart: cart[0]._id,
  });
  res.status(200).json({
    message: 'success',
    data: {
      newItem,
    },
  });
});

exports.getCart = catchAsync(async (req, res, next) => {
  // * check if active cart exists
  const activeCart = await Cart.find({ customer: req.user._id, active: true });
  if (activeCart) {
    res.status(200).json({ message: 'success', data: { cart: activeCart } });
  } else {
    // * check if any cart exists
    const anyCart = await Cart.find({ customer: req.user._id });
    // * need to create a new cart either way
    const newCart = await Cart.create({ customer: req.user._id });
    if (anyCart) {
      // * send new cart, for existing user
      res.status(200).json({ message: 'success', data: { cart: newCart } });
    } else {
      // * no cart exists, new user
      res.status(200).json({ message: 'success', data: { cart: newCart } });
    }
  }
});

exports.updateCart = catchAsync(async (req, res, next) => {
  const updatedItem = await CartItem.findByIdAndUpdate(
    req.params.id,
    {
      amount: req.body.amount,
    },
    { new: true }
  );

  res.status(200).json({
    message: 'success',
    data: {
      updatedItem,
    },
  });
});

exports.deleteItem = catchAsync(async (req, res, next) => {
  await CartItem.findByIdAndDelete(req.params.id);

  res.status(204).json({
    message: 'success',
    data: null,
  });
});

exports.getCartSum = catchAsync(async (req, res, next) => {
  const carts = await Cart.find();
  res.status(201).json({
    message: 'success',
    data: carts.length,
  });
});

exports.getCartItem = catchAsync(async (req, res, next) => {
  const cart = await Cart.find({ customer: req.user._id, active: true }).exec();

  const cartItem = await CartItem.findOne({
    product: req.params.id,
    cart: cart[0]._id,
  }).exec();

  res.status(201).json({
    message: 'success',
    data: cartItem,
  });
});
