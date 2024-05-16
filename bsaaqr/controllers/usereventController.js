// const User = require('../models/User');
// const Event = require('../models/Event');
// const asyncHandler = require('express-async-handler');

// // GET /users/:userId/events
// const getUserEvents = asyncHandler(async (req, res) => {
//     const userId = req.params.userId;

//     try {
//         const user = await User.findById(userId).populate('events');

//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         const events = user.events;

//         res.json({ events });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server Error' });
//     }
// });

// // PUT /users/:id/events/:eventId
// const updateUserEvents = asyncHandler(async (req, res) => {
//     const userId = req.params.id;
//     const eventId = req.params.eventId;

//     try {
//         const user = await User.findById(userId);

//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         // Check if the event is already in the user's events array
//         if (user.events.includes(eventId)) {
//             return res.status(400).json({ message: 'User already joined this event' });
//         }

//         // Add the event to the user's events array
//         user.events.push(eventId);
//         await user.save();

//         res.json({ message: 'User updated successfully', user });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server Error' });
//     }
// });

// module.exports = {
//     updateUserEvents,
//     getUserEvents
// };
