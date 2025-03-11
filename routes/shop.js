import express from 'express';
import { getCart, getCheckout, getIndex, getInvoice, getOrders, getProduct, postCart, postCartDeleteProduct } from '../controllers/shop.js';
import { isAuth } from '../middleware/is-auth.js';

const router = express.Router();

router.get('/', getIndex);

router.get('/products/:productId', getProduct);

router.get('/cart', isAuth, getCart);

router.post('/cart', isAuth, postCart);

router.post('/cart-delete-item', isAuth, postCartDeleteProduct);

//router.post('/create-order', isAuth, postOrder);

router.get('/orders/:orderId', isAuth, getInvoice);

router.get('/orders', isAuth, getOrders);

router.get('/checkout', isAuth, getCheckout);

export default router;
