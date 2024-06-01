const express = require('express');
const router = express.Router();
const eventController = require('../controllers/myCSDController');

// Route for a user to join an event and update myCSD
router.post('/join-event', eventController.joinEvent);

// Route to get myCSD for a user
router.get('/:id/mycsd', eventController.getMyCSD);

module.exports = router;
