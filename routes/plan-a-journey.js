import express from 'express';
import { getPlanAJourney } from '../controllers/plan-a-journey.js';

const router = express.Router();

router.get('/index', getPlanAJourney);

export default router;