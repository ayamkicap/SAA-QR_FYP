// const Event = require('../models/Event');
// const User = require('../models/User');

// // Function to handle user joining an event
// const joinEvent = async (req, res) => {
//     const { userId, eventId } = req.body;
//     try {
//         // Find the user and event
//         const user = await User.findById(userId);
//         const event = await Event.findById(eventId);

//         if (!user || !event) {
//             return res.status(404).json({ message: 'User or Event not found' });
//         }

//         // Check if the user is already joined the event
//         if (!user.events.includes(eventId)) {
//             user.events.push(eventId);

//             // Find or create the myCSD entry for the event's Teras
//             const myCSDEntry = user.myCSD.find(csd => csd.teras === event.Teras);
//             if (myCSDEntry) {
//                 myCSDEntry.points += event.myCSD;
//             } else {
//                 user.myCSD.push({ teras: event.Teras, points: event.myCSD });
//             }

//             await user.save();
//             return res.status(200).json({ message: 'User joined event and myCSD updated' });
//         } else {
//             return res.status(400).json({ message: 'User already joined this event' });
//         }
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: 'Internal server error' });
//     }
// };

// // Function to get myCSD for an event
// const getMyCSD = async (req, res) => {
//     const { id } = req.params;
//     try {
//         const user = await User.findById(id);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         return res.status(200).json({ myCSD: user.myCSD });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: 'Internal server error' });
//     }
// };

// module.exports = {
//     joinEvent,
//     getMyCSD,
// };


const Event = require('../models/Event');
const User = require('../models/User');

// Function to handle user joining an event
const joinEvent = async (req, res) => {
    const { userId, eventId } = req.body;
    try {
        // Find the user and event
        const user = await User.findById(userId);
        const event = await Event.findById(eventId);

        if (!user || !event) {
            return res.status(404).json({ message: 'User or Event not found' });
        }

        console.log('Event found:', event);
        console.log('User found:', user);

        // Ensure event.Teras is defined
        if (!event.Teras) {
            return res.status(400).json({ message: 'Event Teras is not defined' });
        }

        // Check if the user has already joined the event
        if (!user.events.includes(eventId)) {
            user.events.push(eventId);

            // Find or create the myCSD entry for the event's Teras
            let myCSDEntry = user.myCSD.find(csd => csd.teras === event.Teras);
            if (myCSDEntry) {
                myCSDEntry.points += event.myCSD;
            } else {
                user.myCSD.push({ teras: event.Teras, points: event.myCSD });
            }

            console.log('Updated user myCSD:', user.myCSD);

            await user.save();
            return res.status(200).json({ message: 'User joined event and myCSD updated' });
        } else {
            return res.status(400).json({ message: 'User already joined this event' });
        }
    } catch (error) {
        console.error('Error joining event:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Function to get myCSD for an event
const getMyCSD = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ myCSD: user.myCSD });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    joinEvent,
    getMyCSD,
};
