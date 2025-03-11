import express from 'express';
import { errorHasOccurred, notFound } from '../controllers/error.js';
import { getCms, getHome, search } from '../controllers/root.js';
import { isAuth } from '../middleware/is-auth.js';
import adminRoutes from './admin.js';
import authRoutes from './auth.js';
import helpAndContactRoutes from './help-and-contact.js';
import patternLibraryRoutes from './pattern-library.js';
import planAJourneyRoutes from './plan-a-journey.js';
import shopRoutes from './shop.js';
import statusRoutes from './status.js';
import stopRoutes from './stop.js';

const router = express.Router();

router.use('/admin', isAuth, adminRoutes);
router.use('/shop', shopRoutes);
router.use(authRoutes);

router.use('/stop', stopRoutes);
router.use('/status', statusRoutes);
router.use('/plan-a-journey', planAJourneyRoutes);
router.use('/help-and-contact', helpAndContactRoutes);

router.use('/pattern-library', patternLibraryRoutes);

router.post('/search', search);

router.get('/', getHome);

router.use('/', getCms);

router.use('/500', errorHasOccurred);
router.use(notFound);

export default router;
