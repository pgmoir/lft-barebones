import express from 'express';
import { body } from 'express-validator';
import { deleteProduct, getAddProduct, getEditProduct, getProducts, postAddProduct, postEditProduct } from '../controllers/admin.js';

const router = express.Router();

// all routes in this module require authentication

router.get('/products', getProducts);

router.get('/add-product', getAddProduct);

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
  postAddProduct);

router.get('/edit-product/:productId', getEditProduct);

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
  postEditProduct);

router.delete('/delete-product/:productId', deleteProduct);

export default router;
