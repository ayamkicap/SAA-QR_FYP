const mongoose = require('mongoose');

const myCSDSchema = new mongoose.Schema({
    teras: { type: String, required: true },
    points: { type: Number, default: 0 },
});

const notificationSchema = new mongoose.Schema({
    message: { type: String, required: true },
    type: { type: String, enum: ['info', 'warning', 'error'], default: 'info' },
    read: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
  });

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    card_number: {
        type: String,
        required: true
    },
    roles: [{
        type: String,
        default: "Student"
    }],
    year_study: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    },
    events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }],
    notifications: [notificationSchema],
    myCSD: [myCSDSchema]
});

module.exports = mongoose.model('User', userSchema);
