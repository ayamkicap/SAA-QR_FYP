const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const feedbackSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        text: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const eventSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        title: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        },
        update: {
            type: String,
            required: true
        },
        completed: {
            type: Boolean,
            default: false
        },
        date_event: {
            type: Date,
            required: true
        },
        time_event: {
            type: String,
            required: true
        },
        location_event: {
            type: String,
            required: true
        },
        price_event: {
            type: Number,
            required: false
        },
        contact_event: {
            type: String,
            required: true
        },
        img_url_event: {
            type: String, // Store the URL or path to the uploaded image
            required: true
        },
        QR_code: {
            type: String,
            required: false
        },
        key: { 
            type: String 
        },
        iv: { 
            type: String 
        },
        myCSD: {
            type: Number,
            required: false
        },
        Teras: {
            type: String,
            required: false
        },
        user_join: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event'
        }],
        attendance: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event'
        }],
        feedback: [{
            type: [feedbackSchema] // Embedding feedbackSchema
        }],
    },
    {
        timestamps: true
    }
);


eventSchema.plugin(AutoIncrement, {
    inc_field: 'ticket',
    id: 'ticketNums',
    start_seq: 500
})

module.exports = mongoose.model('Event', eventSchema)