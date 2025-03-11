import sgMail from '@sendgrid/mail';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { validationResult } from 'express-validator';
import { User } from '../models/user.js';

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const DOMAIN_URL = process.env.DOMAIN_URL;

sgMail.setApiKey(SENDGRID_API_KEY);

export const getSignup = (req, res, next) => {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    email: '',
    errors: []
  });
};

export const getReset = (req, res, next) => {
  res.render('auth/reset', {
    path: '/reset',
    pageTitle: 'Reset Password',
    errors: []
  });
};

export const getLogin = (req, res, next) => {
  var returnUrl = req.query.url;

  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    returnUrl: returnUrl,
    email: '',
    errors: []
  });
};

export const postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const returnUrl = req.body.returnUrl;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render('auth/login', {
      path: '/login',
      pageTitle: 'Login',
      returnUrl: returnUrl,
      email: email,
      errors: errors.array()
    });
  }

  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        req.flash('errors', 'You have entered an invalid email or password');
        return res.redirect('/login');
      }
      bcrypt
        .compare(password, user.password)
        .then(doMatch => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save(err => {
              res.redirect(returnUrl || '/');
            });
          }
          res.redirect('/login');
        })
        .catch(err => {
          res.redirect('/login');
        });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

export const postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render('auth/signup', {
      path: '/signup',
      pageTitle: 'Signup',
      email: email,
      errors: errors.array()
    });
  }

  bcrypt
    .hash(password, 12)
    .then(hashedPassword => {
      const user = new User({
        email: email,
        password: hashedPassword,
        cart: { items: [] }
      });
      return user.save();
    })
    .then(result => {
      res.redirect('/login');
      const msg = {
        to: email,
        from: 'admin@lft-concept.co.uk',
        subject: 'lft-barebones Signup Successful',
        text: 'Thank you for signing up to this service'
      };
      return sgMail.send(msg);
    })
    .catch(err => {
      console.log(err);
    });
};

export const postReset = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
      return res.redirect('/reset');
    }
    const token = buffer.toString('hex');
    User
      .findOne({email: req.body.email})
      .then(user => {
        if (!user) {
          // req.flash('errors', 'You have entered an invalid email or password');
          return res.redirect('/reset');
        }
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;
        user.save()
          .then(result => {
            res.redirect('/');
            const msg = {
              to: req.body.email,
              from: 'admin@lft-concept.co.uk',
              subject: 'lft-barebones Reset Password',
              text: `
                <p>You requested a password reset</p>
                <p>Click this <a href="${DOMAIN_URL}/reset/${token}">link</a> to set a new password</p>
              `
            };
            return sgMail.send(msg);
          })
          .catch(err => {
            console.log(err);
          });
        })
      .catch(err => {
        console.log(err);
      });
  });
};

export const postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/shop/');
  });
};

export const getNewPassword = (req, res, next) => {
  const token = req.params.token;
  User
    .findOne({resetToken: token, resetTokenExpiration: {$gt: Date.now()}})
    .then(user => {
      res.render('auth/new-password', {
        path: '/new-password',
        pageTitle: 'New Password',
        passwordToken: token,
        userId: user._id.toString()
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const postNewPassword = (req, res, next) => {
  const userId = req.body.userId;
  const newPassword = req.body.password;
  const passwordToken = req.body.passwordToken;
  let resetUser;

  User
    .findOne({
      resetToken: passwordToken, 
      resetTokenExpiration: {$gt: Date.now()}, 
      _id: userId
    })
    .then(user => {
      resetUser = user;
      return bcrypt.hash(newPassword, 12);
    })
    .then(hashedPassword => {
      resetUser.password = hashedPassword;
      resetUser.resetToken = undefined;
      resetUser.resetTokenExpiration = undefined;
      return resetUser.save();
    })
    .then(result => {
      res.redirect('/login');
    })
    .catch(err => {
      console.log(err);
    });
};
