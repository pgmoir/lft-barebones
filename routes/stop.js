const express = require('express');
const router = express.Router();
const stopController = require('../controllers/stop');

router.get('/:stopref', stopController.getStop);

module.exports = router;