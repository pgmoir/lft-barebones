import express from 'express';
import { getPatternLibrary, postFormSubmission } from '../controllers/pattern-library.js';

const router = express.Router();

router.get('/:template', getPatternLibrary);

router.post('/form-submission', postFormSubmission);

export default router;