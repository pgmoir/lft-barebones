const express = require('express');
const router = express.Router();
const rootController = require('../controllers/root');
const isAuth = require('../middleware/is-auth');

const errorController = require('../controllers/error');
const adminRoutes = require('./admin');
const shopRoutes = require('./shop');
const authRoutes = require('./auth');
const stopRoutes = require('./stop');
const statusRoutes = require('./status');
const planAJourneyRoutes = require('./plan-a-journey');
const helpAndContactRoutes = require('./help-and-contact');
const patternLibraryRoutes = require('./pattern-library');

router.use('/admin', isAuth, adminRoutes);
router.use('/shop', shopRoutes);
router.use(authRoutes);

router.use('/stop', stopRoutes);
router.use('/status', statusRoutes);
router.use('/plan-a-journey', planAJourneyRoutes);
router.use('/help-and-contact', helpAndContactRoutes);

router.use('/pattern-library', patternLibraryRoutes);

router.post('/search', rootController.search);

router.get('/', rootController.getHome);

router.use('/', rootController.getCms);

router.use('/500', errorController.errorHasOccurred);
router.use(errorController.notFound);

module.exports = router;
