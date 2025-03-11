import bodyParser from 'body-parser';
import flash from 'connect-flash';
import { default as connectMongoDBSession } from 'connect-mongodb-session';
import csrf from 'csurf';
import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
// import multerS3 from 'multer-s3';
// import aws from 'aws-sdk';
import { postOrder } from './controllers/shop.js';
import { isAuth } from './middleware/is-auth.js';
import { User } from './models/user.js';
import rootRoutes from './routes/root.js';

import { default as dotenv } from 'dotenv';

dotenv.config()

const SESSION_SECRET = process.env.SESSION_SECRET;
const MONGODB_URI = process.env.MONGODB_URL;
const PORT = process.env.PORT;


// aws.config.update({
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   region: 'eu-west-1'
// });
// const s3 = new aws.S3();

const app = express();

const MongoDBStore = connectMongoDBSession(session);
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});
const csrfProtection = csrf();

// const s3Storage = multerS3({
//   s3: s3,
//   bucket: process.env.AWS_S3_BUCKET,
//   metadata: function (req, file, cb) {
//     cb(null, {fieldName: file.fieldname});
//   },
//   key: function (req, file, cb) {
//     cb(null, new Date().getTime() + '-' + file.originalname);
//   }
// });

const imagesFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
// app.use(multer({storage: s3Storage, limits: { fileSize: 102400 }, fileFilter: imagesFilter}).single('image'));

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

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

app.use('/shop/create-order', isAuth, postOrder);

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
