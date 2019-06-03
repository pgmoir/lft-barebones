const express = require('express');
const router = express.Router();
const statusController = require('../controllers/status');

router.get('/:mode/:when?', statusController.getMode);

module.exports = router;