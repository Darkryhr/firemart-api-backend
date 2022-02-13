const express = require('express');
const authController = require('../controllers/authController');
const orderController = require('../controllers/orderController');

const router = express.Router();

router.route('/').get(authController.protect, orderController.getOrder);
router
  .route('/finish')
  .post(authController.protect, orderController.completeOrder);

router
  .route('/invoice/:id')
  .get(authController.protect, orderController.getInvoice);
module.exports = router;
