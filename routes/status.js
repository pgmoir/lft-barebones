import express from 'express';
import { getMode } from '../controllers/status.js';

const router = express.Router();

router.get('/:mode/:when?', getMode);

export default router;