const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

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
            required: true
        },
        user_join: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event'
        }]
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