const catchAsync = require('../utils/catchAsync');
const Cart = require('../models/Cart');
const CartItem = require('../models/CartItem');
const Order = require('../models/Order');

exports.getOrder = catchAsync(async (req, res, next) => {
  const cart = await Cart.find({ customer: req.user._id, active: true }).exec();
  if (cart.length) {
    const products = await CartItem.find({ cart: cart[0].id }).exec();
    res.status(200).json({
      message: 'success',
      data: {
        products,
        cart,
      },
    });
  } else {
    const newCart = await Cart.create({ customer: req.user._id, active: true });
    res.status(200).json({
      message: 'success',
      data: {
        newCart,
      },
    });
  }
});

exports.completeOrder = catchAsync(async (req, res, next) => {
  const cart = await Cart.findOneAndUpdate(
    { customer: req.user._id, active: true },
    { active: false },
    { new: true }
  );
  const cartItems = await CartItem.find({ cart: cart._id });
  const sumTotal = cartItems
    .map((item) => +item.price * +item.amount)
    .reduce((acc, a) => acc + a, 0);
  const order = await Order.create({
    customer: req.user._id,
    cart: cart._id,
    price: sumTotal,
    address: `${req.body.city}, ${req.body.street}`,
    deliveryDate: req.body.delivery,
    orderedAt: req.body.orderedAt,
    creditCardDigits: req.body.credit,
  });
  res.status(200).json({
    message: 'success',
    data: {
      order,
    },
  });
});

exports.getInvoice = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id).exec();
  res.status(200).json({
    message: 'success',
    data: {
      order,
    },
  });
});
