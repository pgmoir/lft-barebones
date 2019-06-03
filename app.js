const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const shopController = require('./controllers/shop');
const isAuth = require('./middleware/is-auth');

const SESSION_SECRET = process.env.SESSION_SECRET || 'lftbarebones12345';
const MONGODB_URI = process.env.MONGODB_URL || 'mongodb://localhost:27017/lftbarebones';
const PORT = process.env.PORT || 5000;

const User = require('./models/user');

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: 'eu-west-1'
});
const s3 = new aws.S3();

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});
const csrfProtection = csrf();

const s3Storage = multerS3({
  s3: s3,
  bucket: process.env.AWS_S3_BUCKET,
  metadata: function (req, file, cb) {
    cb(null, {fieldName: file.fieldname});
  },
  key: function (req, file, cb) {
    cb(null, new Date().getTime() + '-' + file.originalname);
  }
});

const imagesFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.set('view engine', 'ejs');
app.set('views', 'views');

const rootRoutes = require('./routes/root');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({storage: s3Storage, limits: { fileSize: 102400 }, fileFilter: imagesFilter}).single('image'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({ 
    secret: SESSION_SECRET, 
    resave: false, 
    saveUninitialized: false, 
    store: store
  })
);

app.use(flash());

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  next();
});

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      if (!user) {
        return next();
      }
      req.user = user;
      next();
    })
    .catch(err => {
      next(new Error(err));
    });
});

app.use((req, res, next) => {
  const errors = req.flash('errors');
  if (errors.length) {
    res.locals.error = {
      icon: 'exclamation-triangle',
      style: 'danger',
      messages: errors
    };
  }

  next();
});

app.use('/shop/create-order', isAuth, shopController.postOrder);

app.use(csrfProtection);
app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use('/', rootRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  res.status(500).render('500', { 
    pageTitle: 'Page Not Found',
    path: '/500'
  });
});

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true })
  .then(result => {
    app.listen(PORT, () => {
      console.log('listening on port', PORT);
    })
  })
  .catch(err => {
      console.log(err);
  });
