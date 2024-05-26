const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

router.route('/:userId/notifications')
  .post(notificationController.addNotification)
  .get(notificationController.getNotifications);

router.route('/:userId/notifications/:notificationId')
  .patch(notificationController.markNotificationAsRead);

module.exports = router;
