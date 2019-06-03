const express = require('express');
const router = express.Router();
const { body } = require('express-validator/check');

const adminController = require('../controllers/admin');

// all routes in this module require authentication

router.get('/products', adminController.getProducts);

router.get('/add-product', adminController.getAddProduct);

router.post(
  '/add-product',
  [
    body('title', 'Please enter a title of at least 5 characters')
      .isLength({min: 5}),
    body('price', 'Please enter a valid price')
      .isFloat({min: 0.49}),
    body('description', 'Please enter a description of at least 10 characters')
      .isLength({min: 10})
  ],
  adminController.postAddProduct);

router.get('/edit-product/:productId', adminController.getEditProduct);

router.post(
  '/edit-product',
  [
    body('title', 'Please enter a title of at least 5 characters')
      .isLength({min: 5}),
    body('price', 'Please enter a valid price')
      .isFloat({min: 0.49}),
    body('description', 'Please enter a description of at least 10 characters')
      .isLength({min: 10})
  ], 
  adminController.postEditProduct);

router.delete('/delete-product/:productId', adminController.deleteProduct);

module.exports = router;
