const User = require('../models/User');
const asyncHandler = require('express-async-handler');

// @desc Add a new notification
// @route POST /users/:userId/notifications
// @access Private
const addNotification = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { message, type } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  user.notifications.push({ message, type });
  await user.save();

  res.status(201).json(user.notifications);
});

// @desc Get all notifications for a user
// @route GET /users/:userId/notifications
// @access Private
const getNotifications = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId).select('notifications');

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.status(200).json(user.notifications);
});

// @desc Mark a notification as read
// @route PATCH /users/:userId/notifications/:notificationId
// @access Private
const markNotificationAsRead = asyncHandler(async (req, res) => {
  const { userId, notificationId } = req.params;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const notification = user.notifications.id(notificationId);
  if (!notification) {
    return res.status(404).json({ message: 'Notification not found' });
  }

  notification.read = true;
  await user.save();

  res.status(200).json(notification);
});

module.exports = {
  addNotification,
  getNotifications,
  markNotificationAsRead,
};
