import path from 'path';
import PdfDocument from 'pdfkit';

// import Stripe from 'stripe';

import { Order } from '../models/order.js';
import { Product } from '../models/product.js';

const ITEMS_PER_PAGE = 3;

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
//   apiVersion: '2023-08-16',
// });

export const getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/shop/products'
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

export const getIndex = (req, res, next) => {
  const page = +req.query.page || 1;
  let totalItems;

  Product
    .find()
    .countDocuments()
    .then(numberOfProducts => {
      totalItems = numberOfProducts;
      return Product.find()
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE);
    })
    .then(products => {
      res.render('shop/index', {
        products: products,
        pageTitle: 'Shop',
        path: '/shop/',
        pagination: {
          totalProducts: totalItems,
          currentPage: page,
          hasNextPage: ITEMS_PER_PAGE * page < totalItems,
          hasPreviousPage: page > 1,
          nextPage: page + 1,
          previousPage: page - 1,
          lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE)  
        }
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const getCart = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      const products = user.cart.items;
      res.render('shop/cart', {
        path: '/shop/cart',
        pageTitle: 'Your Cart',
        products: products
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

export const postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then(product => {
      return req.user.addToCart(product);
    })
    .then(result => {
      res.redirect('/shop/cart');
    });
};

export const postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .removeFromCart(prodId)
    .then(result => {
      res.redirect('/shop/cart');
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

export const postOrder = (req, res, next) => {
  const token = req.body.stripeToken;
  let totalPrice = 0;

  req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      user.cart.items.forEach(p => {
        totalPrice += p.quantity * p.productId.price;
      });
      const products = user.cart.items.map(i => {
        return { quantity: i.quantity, product: { ...i.productId._doc } };
      });
      const order = new Order({
        user: {
          name: req.user.name,
          userId: req.user
        },
        products: products
      });
      return order.save();
    })
    .then(result => {
      // const charge = stripe.charges.create({
      //   amount: totalPrice * 100,
      //   currency: 'gbp',
      //   description: 'Order from LFT',
      //   source: token,
      //   metadata: {
      //     order_id: result._id.toString()
      //   }
      // });
      return req.user.clearCart();
    })
    .then(() => {
      res.redirect('/shop/orders');
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

export const getOrders = (req, res, next) => {
  Order.find({ 'user.userId': req.user._id })
    .then(orders => {
      res.render('shop/orders', {
        path: '/shop/orders',
        pageTitle: 'Your Orders',
        orders: orders
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

export const getInvoice = (req, res, next) => {
  const orderId = req.params.orderId;
  Order.findById(orderId)
    .then(order => {
      if (!order) {
        return next(new Error('No order found'));
      }
      if (order.user.userId.toString() !== req.user._id.toString()) {
        return next(new Error('User is not authorised'));
      }
      const invoiceName = `invoice-${orderId}.pdf`;
      const invoicePath = path.join('data', 'invoices', invoiceName);

      // 3. generate pdf on fly and stream
      const pdfDoc = new PdfDocument();
      //pdfDoc.pipe(fs.createWriteStream(invoicePath)); we dont want to save physical copies but could do this way
      pdfDoc.pipe(res);
      
      pdfDoc.fontSize(26).text('Invoice', {
        underline: true
      });

      pdfDoc.fontSize(14).text('-----------------------------');

      let totalPrice = 0;
      order.products.forEach(p => {
        pdfDoc.text(`${p.product.title} - ${p.quantity} x £${Number(p.product.price).toFixed(2)}`);
        totalPrice += (p.quantity * p.product.price);
      })

      pdfDoc.text('-----------------------------');

      pdfDoc.text(`Total Price £${Number(totalPrice).toFixed(2)}`);

      pdfDoc.end();

      // 2. better to stream content
      // const file = fs.createReadStream(invoicePath);
      // res.setHeader('Content-Type', 'application/pdf');
      // res.setHeader('Content-Disposition', `inline; filename="${invoiceName}"`);
      // file.pipe(res);

      // 1. just read from static file and serve - but this has memory issues
      // fs.readFile(invoicePath, (err, data) => {
      //   if (err) {
      //     return next(err);
      //   }
      //   res.setHeader('Content-Type', 'application/pdf');
      //   res.setHeader('Content-Disposition', `inline; filename="${invoiceName}"`);
      //   //res.setHeader('Content-Disposition', `attachment; filename="${invoiceName}"`);
      //   res.send(data);
      // });
    })
    .catch(err => next(err));
}

export const getCheckout = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      const products = user.cart.items;
      let totalPrice = 0;
      products.forEach(p => {
        totalPrice += p.quantity * p.productId.price;
      });
      res.render('shop/checkout', {
        path: '/shop/checkout',
        pageTitle: 'Checkout',
        products: products,
        totalPrice: totalPrice 
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });

};
