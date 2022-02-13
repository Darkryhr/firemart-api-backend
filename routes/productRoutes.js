const express = require('express');

const router = express.Router();

const productController = require('../controllers/productController');

const authController = require('../controllers/authController');

router.route('/').get(productController.getAllProducts);
router.route('/categories').get(productController.getCategories);
router
  .route('/:id')
  .get(productController.getProduct)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    productController.updateProduct
  );

router.route('/gallery').post(productController.addProductImage);
router
  .route('/')
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    productController.createProduct
  );
module.exports = router;
