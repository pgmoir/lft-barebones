import express from 'express';
import { body, check } from 'express-validator';

import { getLogin, getNewPassword, getReset, getSignup, postLogin, postLogout, postNewPassword, postReset, postSignup } from '../controllers/auth.js';
import { User } from '../models/user.js';

const router = express.Router();

router.get('/login', getLogin);

router.post(
  '/login', 
  [
    check('email', 'Please enter a valid email')
      .isEmail(),
    body('password', 'Please enter a valid password')
      .isLength({min: 5})
  ],
  postLogin);

router.get('/signup', getSignup);

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
  postSignup);

router.get('/reset', getReset);

router.post('/reset', postReset);

router.get('/reset/:token', getNewPassword);

router.post('/new-password', postNewPassword);

router.post('/logout', postLogout);

export default router;