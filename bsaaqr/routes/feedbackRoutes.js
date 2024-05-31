const express = require('express');
const router = express.Router();
const eventController = require('../controllers/feedbackController');

// Other existing routes...

// Add feedback to an event
router.post('/feedback', eventController.addFeedback);

// Get feedback for an event
router.get('/:id/feedback', eventController.getFeedback);

module.exports = router;
