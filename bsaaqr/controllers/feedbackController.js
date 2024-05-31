const Event = require('../models/Event');
const User = require('../models/User');

// Other existing functions...

// Add feedback to an event
const addFeedback = async (req, res) => {
    try {
        const { eventId, userId, text } = req.body;
        const event = await Event.findById(eventId);
        const user = await User.findById(userId);

        if (!event || !user) {
            return res.status(404).json({ message: 'Event or User not found' });
        }

        const feedback = { user: userId, text };
        event.feedback.push(feedback);
        await event.save();

        res.status(200).json({ message: 'Feedback added', feedback });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get feedback for an event
const getFeedback = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id).populate('feedback.user', 'name');
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json(event.feedback);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    // Other existing functions...
    addFeedback,
    getFeedback,
};
