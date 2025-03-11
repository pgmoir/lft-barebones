import { validationResult } from 'express-validator';
import { Product } from '../models/product.js';
import { deleteImage } from '../util/file.js';


const ITEMS_PER_PAGE = 3;

export const getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    product: {
      title: '',
      price: 0.00,
      description: ''
    },
    errors: [],
    editing: false
  });
};

export const postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const image = req.file;
  const price = req.body.price;
  const description = req.body.description;
  
  const validation = validationResult(req);
  let errors = [];
  if (!validation.isEmpty()) {
    errors = validation.array();
  }
  if (!image) {
    errors.push({
      param: 'image',
      msg: 'Invalid or missing file'
    });
  }
  if (errors.length) {
    return res.status(422).render('admin/edit-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      product: {
        title: title,
        price: price,
        description: description
      },
      errors: errors,
      editing: false
    });
  }

  const product = new Product({
    title: title,
    price: price,
    description: description,
    image: image.key,
    imageUrl: image.location,
    userId: req.user
  });
  
  product
    .save()
    .then(result => {
      res.redirect('/admin/products');
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

export const getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      if (!product) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        product: product,
        errors: [],
        editing: editMode
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

export const postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const image = req.file;
  const updatedDesc = req.body.description;
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      product: {
        _id: prodId,
        title: updatedTitle,
        price: updatedPrice,
        description: updatedDesc
      },
      errors: errors.array(),
      editing: true
    });
  }

  Product.findById(prodId)
    .then(product => {
      if (product.userId.toString() !== req.user._id.toString()) {
        return res.redirect('/');
      }
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.description = updatedDesc;
      if (image) {
        deleteImage(product.image);
        product.image = image.key;
        product.imageUrl = image.location;
      }
      return product.save().then(result => {
        res.redirect('/admin/products');
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

export const getProducts = (req, res, next) => {
  const page = +req.query.page || 1;
  let totalItems;

  Product
    .find({
      userId: req.user._id
    })
    .countDocuments()
    .then(numberOfProducts => {
      totalItems = numberOfProducts;
      return Product.find()
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE);
    })
    .then(products => {
      res.render('admin/products', {
        products: products,
        pageTitle: 'Admin Products',
        path: '/admin/products',
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
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

export const deleteProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      if (!product) {
        return new Error('Product not found');
      }
      fileHelper.deleteImage(product.image);
      return Product.deleteOne({ _id: prodId, userId: req.user._id });
    })
    .then(() => {
      res.status(200).json({ message: 'Success' });
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed' });
    });
};
