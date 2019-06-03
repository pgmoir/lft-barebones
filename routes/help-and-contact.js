const express = require('express');
const router = express.Router();
const { check } = require('express-validator/check');

const contactlessController = require('../controllers/help-and-contact/contact-us-about-contactless');
const cyclingController = require('../controllers/help-and-contact/contact-us-about-cycling');

const isAuth = require('../middleware/is-auth');

router.get('/contact-us-about-contactless', isAuth, contactlessController.getContact);
router.post('/contact-us-about-contactless', 
  check('comments').isLength({min: 10}).withMessage('You must enter at least 10 characters'), 
  isAuth, contactlessController.postContact);

router.get('/contact-us-about-cycling', isAuth, cyclingController.getContact);
router.post('/contact-us-about-cycling', 
  check('comments').isLength({min: 10}).withMessage('You must enter at least 10 characters'), 
  isAuth, cyclingController.postContact);

//router.get('/user-comments', helpAndContactController.getAllUserComments);

module.exports = router;