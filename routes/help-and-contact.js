import express from 'express';
import { check } from 'express-validator';

import { getContact, postContact } from '../controllers/help-and-contact/contact-us-about-contactless.js';
import { getContactAboutCycling, postContactAboutCycling } from '../controllers/help-and-contact/contact-us-about-cycling.js';

import { isAuth } from '../middleware/is-auth.js';

const router = express.Router();

router.get('/contact-us-about-contactless', isAuth, getContact);
router.post('/contact-us-about-contactless', 
  check('comments').isLength({min: 10}).withMessage('You must enter at least 10 characters'), 
  isAuth, postContact);

router.get('/contact-us-about-cycling', isAuth, getContactAboutCycling);
router.post('/contact-us-about-cycling', 
  check('comments').isLength({min: 10}).withMessage('You must enter at least 10 characters'), 
  isAuth, postContactAboutCycling);

//router.get('/user-comments', helpAndContactController.getAllUserComments);

export default router;