const Event = require('../models/Event');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const QRCode = require('qrcode');  // Import the QRCode module
const CryptoJS = require('crypto-js');
const crypto = require('crypto');

// Get the secret key from environment variables
const secret_key1 = process.env.SECRET_KEY1;
const secret_key2 = process.env.SECRET_KEY2;

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


const { randomBytes, createCipheriv, createDecipheriv } = require('crypto');

function generateKeyAndIV() {
  const key = secret_key1; // 256-bit key
  const iv = scrypto.randomBytes(16); // Initialization vector
  return { key, iv };
}

function encrypt(text, key, iv) {
  const cipher = createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

// function decrypt(encryptedData, key, iv) {
//   const decipher = createDecipheriv('aes-256-cbc', key, iv);
//   let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
//   decrypted += decipher.final('utf8');
//   return decrypted;
// }

function decrypt(encryptedData, keyBase64, ivBase64) {
    if (!encryptedData || !keyBase64 || !ivBase64) {
        throw new Error('encryptedData, keyBase64, and ivBase64 are required for decryption');
    }

    const key = Buffer.from(keyBase64, 'base64');
    const iv = Buffer.from(ivBase64, 'base64');
    const decipher = createDecipheriv('aes-256-cbc', key, iv);
    try {
        let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    } catch (error) {
        console.error('Decryption failed:', error);
        throw new Error('Decryption failed');
    }
}




// @desc Create new event
// @route POST /events
// @access Private
const createNewEvent = asyncHandler(async (req, res) => {
    const { user, title, text, update, completed, date_event, time_event, location_event, price_event, contact_event, QR_code, user_join, attendance, myCSD, Teras} = req.body;
    const img_url_event = req.file ? req.file.path.replace(/\\/g, '/') : 'default.jpg'; // Save the path to the uploaded image

    // Validate required fields

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
    console.log("user_join:", user_join);
    console.log("attendance:", attendance);
    console.log("myCSD:", myCSD);
    console.log("Teras:", Teras);

    // Confirm data
    // if (!user || !title || !text || !update || typeof completed !== 'boolean' || !date_event || !time_event || !location_event || !price_event || !contact_event || !QR_code || !img_url_event) {
    //     return res.status(400).json({ message: 'All fields are required' });
    //     console.log("salah")
    // }

    //console.log("sini")

    // Validate user_join
    let userJoinArray;
    try {
        userJoinArray = user_join ? JSON.parse(user_join) : [];
    } catch (error) {
        return res.status(400).json({ message: 'Invalid user_join format' });
    }

    // Check for duplicate title
    console.log(title)
    const duplicate = await Event.findOne({ title }).lean().exec();

    // if (duplicate) {
    //     return res.status(409).json({ message: 'Duplicate event title' });
    // }

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
        // QR_code,
        user_join: userJoinArray,
        attendance: userJoinArray,
        myCSD,
        Teras
    });

    // Generate the QR code using the event ID
    const qrCodeData = event._id.toString();
    const qrCodeUrl = await QRCode.toDataURL(qrCodeData);



    // // Encrypt the event ID
    // const { key, iv } = generateKeyAndIV();
    // const keyBase64 = key.toString('base64');
    // const ivBase64 = iv.toString('base64');
    // const eventId = event._id.toString();
    // const encryptedEventId = encrypt(eventId, key, iv);
    //const decryptedEventId = decrypt(encryptedEventId, key, iv);

    // Generate the QR code with the encrypted event ID
    //const qrCodeUrl = await QRCode.toDataURL(encryptedEventId);

    // // Update the event with the QR code URL
    event.QR_code = qrCodeUrl;
    // event.key = keyBase64;
    // event.iv = ivBase64;
    await event.save();


    console.log(event)
    //console.log("key:" + key)

    console.log("eventid:" + qrCodeData)
    //console.log("eventid-encrypt:" + encryptedEventId)
    //console.log("iv:" + iv)

    //console.log("test:" + decryptedEventId)

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
    const { id } = req.body; // Extract id from the body
    const { user, title, text, update, date_event, time_event, location_event, price_event, contact_event, QR_code, myCSD, Teras } = req.body;

    let { completed, user_join, attendance } = req.body;

    console.log(req.body);

    if (!id) {
        return res.status(400).json({ message: 'Event ID is required' });
    }

    // // Confirm data
    // if (!id || !user || !title || !text || !update || completed === undefined || !date_event || !time_event || !location_event || !contact_event || !QR_code) {
    //     return res.status(400).json({ message: 'All fields are required' });
    // }

    // Convert `completed` to boolean
    if (typeof completed === 'string') {
        completed = completed === 'true';
    }

    // Parse `user_join` if it's a JSON string
    // let userJoinArray = [];
    // if (user_join) {
    //     try {
    //         userJoinArray = JSON.parse(user_join);
    //     } catch (error) {
    //         return res.status(400).json({ message: 'Invalid user_join format' });
    //     }
    // }

    // Confirm event exists to update
    const event = await Event.findById(id).exec();

    if (!event) {
        return res.status(400).json({ message: 'Event not found' });
    }

    // Check if image file is uploaded
    const img_url_event = req.file ? req.file.path.replace(/\\/g, '/') : event.img_url_event;

    // Check for duplicate title
    const duplicate = await Event.findOne({ title }).lean().exec();

    // Allow renaming of the original event
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate event title' });
    }

    // Update fields only if they are provided
    if (user) event.user = user;
    if (title) event.title = title;
    if (text) event.text = text;
    if (update) event.update = update;
    if (completed !== undefined) event.completed = completed;
    if (date_event) event.date_event = date_event;
    if (time_event) event.time_event = time_event;
    if (location_event) event.location_event = location_event;
    if (price_event) event.price_event = price_event;
    if (contact_event) event.contact_event = contact_event;
    if (QR_code) event.QR_code = QR_code;
    if (user_join) event.user_join = user_join;
    if (attendance) event.attendance = attendance;
    if (myCSD) event.myCSD = myCSD;
    if (Teras) event.Teras = Teras;

    // event.user = user;
    // event.title = title;
    // event.text = text;
    // event.update = update;
    // event.completed = completed;
    // event.date_event = date_event;
    // event.time_event = time_event;
    // event.location_event = location_event;
    // event.price_event = price_event;
    // event.contact_event = contact_event;
    // event.img_url_event = img_url_event;
    // event.QR_code = QR_code;
    // event.user_join = userJoinArray;

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

// @desc Decrypt QR code
// @route POST /decrypt_qr
// @access Private
const decryptQR = asyncHandler(async (req, res) => {
    const { encrypted_data, key, iv } = req.body;

    // Log the values to check if they are received correctly
    console.log('Received encrypted_data:', encrypted_data);
    console.log('Received key:', key);
    console.log('Received iv:', iv);

    if (!encrypted_data || !key || !iv) {
        return res.status(400).json({ message: 'encrypted_data, key, and iv are required' });
    }

    try {
        // Ensure that encrypted_data is the correct length for decryption
        if (encrypted_data.length < 32) { // Adjust the minimum length check as needed
            throw new Error('Invalid encrypted data length');
        }

        // Decrypt the data
        const decryptedData = decrypt(encrypted_data, key, iv);
        res.json({ decrypted: decryptedData });
    } catch (error) {
        console.error('Decryption error:', error);
        res.status(500).json({ message: 'Failed to decrypt data' });
    }
});




// Other CRUD operations (updateEvent, deleteEvent) remain the same

module.exports = {
    getAllEvents,
    createNewEvent,
    updateEvent,
    deleteEvent,
    decryptQR
};
