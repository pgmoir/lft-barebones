const express = require('express');
const router = express.Router();
const planAJourneyController = require('../controllers/plan-a-journey');

router.get('/index', planAJourneyController.getPlanAJourney);

module.exports = router;