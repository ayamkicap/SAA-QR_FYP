const express = require('express')
const router = express.Router()
const eventsController = require('../controllers/eventController')

router.route('/')
    .get(eventsController.getAllEvents)
    .post(eventsController.createNewEvent)
    .patch(eventsController.updateEvent)
    .delete(eventsController.deleteEvent)

module.exports = router