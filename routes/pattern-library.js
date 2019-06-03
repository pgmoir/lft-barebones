const express = require('express');
const router = express.Router();
const patternLibraryController = require('../controllers/pattern-library');

router.get('/:template', patternLibraryController.getPatternLibrary);

router.post('/form-submission', patternLibraryController.postFormSubmission);

module.exports = router;