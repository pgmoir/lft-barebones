const express = require('express');
const { check, body } =require('express-validator/check');

const authController = require('../controllers/auth');
const User = require('../models/user');

const router = express.Router();

router.get('/login', authController.getLogin);

router.post(
  '/login', 
  [
    check('email', 'Please enter a valid email')
      .isEmail(),
    body('password', 'Please enter a valid password')
      .isLength({min: 5})
  ],
  authController.postLogin);

router.get('/signup', authController.getSignup);

router.post(
  '/signup', 
  [
    check('email')
      .isEmail()
      .withMessage('Please enter a valid email')
      .custom((value, {req}) => {
        return User.findOne({email: value}).then(userDoc => { 
          if (userDoc) {
            return Promise.reject('Email already exists. Please enter a different one.');
          }
        });
      })
      .normalizeEmail(),
    body('password')
      .isLength({min: 5})
      .withMessage('Password must be at least 5 characters')
      .trim(),
    body('confirmPassword')
      .custom((value, {req}) => {
        if (value !== req.body.password) {
          throw new Error('Passwords must match');
        }
        return true;
      })
      .trim()
  ],
  authController.postSignup);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);

router.post('/logout', authController.postLogout);

module.exports = router;