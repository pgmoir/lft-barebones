import express from 'express';
import { getStop } from '../controllers/stop.js';

const router = express.Router();

router.get('/:stopref', getStop);

export default router;