const Event = require('../models/Event');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const multer = require('multer'); // For handling file uploads

// Set up multer for handling image uploads
//const upload = multer({ dest: 'uploads/' }); // Adjust the destination folder as needed

// @desc Get all events 
// @route GET /events
// @access Private
const getAllEvents = asyncHandler(async (req, res) => {
    // Get all events from MongoDB
    const events = await Event.find().lean();

    // If no events
    if (!events?.length) {
        return res.status(400).json({ message: 'No events found' });
    }

    // Add username to each event before sending the response
    const eventsWithUser = await Promise.all(events.map(async (event) => {
        const user = await User.findById(event.user).lean().exec();
        return { ...event, username: user.username };
    }));

    res.json(eventsWithUser);
});

// @desc Create new event
// @route POST /events
// @access Private
const createNewEvent = asyncHandler(async (req, res) => {
    const { user, title, text, update, completed, date_event, time_event, location_event, price_event, contact_event, QR_code } = req.body;
    const img_url_event = req.file.filename ? req.file.path.replace(/\\/g, '/') : 'dsf'; // Save the path to the uploaded image

    console.log(img_url_event)



    // console.log("Event object to be created:", {
    //     user,
    //     title,
    //     text,
    //     update,
    //     completed,
    //     date_event,
    //     time_event,
    //     location_event,
    //     price_event,
    //     contact_event,
    //     img_url_event,
    //     QR_code
    //   });
    

    console.log("reqfile", req.file);
    console.log("user:", user);
    console.log("title:", title);
    console.log("text:", text);
    console.log("update:", update);
    console.log("completed:", completed);
    console.log("date_event:", date_event);
    console.log("time_event:", time_event);
    console.log("location_event:", location_event);
    console.log("price_event:", price_event);
    console.log("contact_event:", contact_event);
    console.log("QR_code:", QR_code);
    console.log("img_url_event:", img_url_event);

    // // Confirm data
    // if (!user || !title || !text || !update || typeof completed !== 'boolean' || !date_event || !time_event || !location_event || !price_event || !contact_event || !QR_code || !img_url_event) {
    //     return res.status(400).json({ message: 'All fields are required' });
    //     console.log("salah")
    // }

    // Check for duplicate title
    const duplicate = await Event.findOne({ title }).lean().exec();

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate event title' });
    }

    // Create and store the new event
    const event = await Event.create({
        user,
        title,
        text,
        update,
        completed,
        date_event,
        time_event,
        location_event,
        price_event,
        contact_event,
        img_url_event,
        QR_code
    });

    if (event) { // Created
        return res.status(201).json({ message: req.file.filename });
    } else {
        return res.status(400).json({ message: 'Invalid event data received' });
    }
});


// @desc Update a event
// @route PATCH /events
// @access Private
const updateEvent = asyncHandler(async (req, res) => {
    const { id, user, title, text, update, completed, date_event, time_event, location_event, price_event, contact_event, QR_code } = req.body;

    // Confirm data
    if (!id || !user || !title || !text || !update || typeof completed !== 'boolean' || !date_event || !time_event || !location_event || !price_event || !contact_event || !QR_code) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Confirm event exists to update
    const event = await Event.findById(id).exec();

    if (!event) {
        return res.status(400).json({ message: 'Event not found' });
    }

    // Check if image file is uploaded
    const img_url_event = req.file ? req.file.path : event.img_url_event;

    // Check for duplicate title
    const duplicate = await Event.findOne({ title }).lean().exec();

    // Allow renaming of the original event
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate event title' });
    }

    event.user = user;
    event.title = title;
    event.text = text;
    event.update = update;
    event.completed = completed;
    event.date_event = date_event;
    event.time_event = time_event;
    event.location_event = location_event;
    event.price_event = price_event;
    event.contact_event = contact_event;
    event.img_url_event = img_url_event;
    event.QR_code = QR_code;

    const updatedEvent = await event.save();

    res.json(`'${updatedEvent.title}' updated`);
});


// @desc Delete a event
// @route DELETE /events
// @access Private
const deleteEvent = asyncHandler(async (req, res) => {
    const { id } = req.body;

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Event ID required' });
    }

    // Confirm event exists to delete
    const event = await Event.findById(id).exec();

    if (!event) {
        return res.status(400).json({ message: 'Event not found' });
    }

    const result = await event.deleteOne();

    const reply = `Event '${event.title}' with ID ${event._id} deleted`;

    res.json(reply);
});


// Other CRUD operations (updateEvent, deleteEvent) remain the same

module.exports = {
    getAllEvents,
    createNewEvent,
    updateEvent,
    deleteEvent
};
