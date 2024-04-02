const mongoose = require('mongoose')

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
    }
})

module.exports = mongoose.model('User', userSchema)