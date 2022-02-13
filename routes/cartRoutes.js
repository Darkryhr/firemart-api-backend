const express = require('express');
const authController = require('../controllers/authController');
const cartController = require('../controllers/cartController');

const router = express.Router();

router.route('/sum').get(cartController.getCartSum);
router.route('/').get(authController.protect, cartController.getCart);
router.route('/:id').get(authController.protect, cartController.getCartItem);
router.route('/:id').patch(authController.protect, cartController.updateCart);
router.route('/:id').delete(authController.protect, cartController.deleteItem);
router.route('/add').post(authController.protect, cartController.addToCart);

module.exports = router;
