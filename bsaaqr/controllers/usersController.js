const User = require('../models/User');
const Event = require('../models/Event');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

// Get the secret key from environment variables
const secret_key1 = process.env.SECRET_KEY1;

function generateKeyAndIV() {
    const key = Buffer.from(secret_key1, 'hex'); // Convert from hex to buffer
    if (key.length !== 32) {
        throw new Error('Invalid key length: ' + key.length);
    }
    const iv = crypto.randomBytes(16); // Initialization vector
    return { key, iv };
}

function encrypt(text, key, iv) {
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

function decrypt(encryptedData, key, iv) {
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password').lean();

    if (!users?.length) {
        return res.status(400).json({ message: 'No users found' });
    }

    res.json(users);
});

// @desc Create new user
// @route POST /users
// @access Private
const createNewUser = asyncHandler(async (req, res) => {
    const { username, email, password, card_number, roles, year_study, active, events, eventAttendance } = req.body;

    // Confirm data
    if (!username || !email || !password || !card_number || !year_study || !Array.isArray(roles) || !roles.length || !active) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Check for duplicate username or email
    const duplicateUsername = await User.findOne({ username }).lean().exec();
    const duplicateEmail = await User.findOne({ email }).lean().exec();

    if (duplicateUsername) {
        return res.status(409).json({ message: 'Duplicate username' });
    }

    if (duplicateEmail) {
        return res.status(409).json({ message: 'Duplicate email' });
    }

    // Hash password
    const hashedPwd = await bcrypt.hash(password, 10); // salt rounds

    const userObject = {
        username,
        email,
        password: hashedPwd,
        card_number,
        roles,
        year_study,
        active,
        events,
        eventAttendance,
    };

    // Create and store new user
    const user = await User.create(userObject);

    // Encrypt the user ID
    const { key, iv } = generateKeyAndIV();
    const keyBase64 = key.toString('base64');
    const ivBase64 = iv.toString('base64');
    const userId = user._id.toString();
    const encryptedUserId = encrypt(userId, key, iv);

    user.encrypt = encryptedUserId;
    user.iv = ivBase64;
    user.key = keyBase64;

    await user.save();

    if (user) {
        res.status(201).json({ message: `New user ${username} created` });
    } else {
        res.status(400).json({ message: 'Invalid user data received' });
    }
});

// @desc Update a user
// @route PATCH /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {
    let { id, username, email, roles, active, password, card_number, year_study, events, eventAttendance, encrypt, iv, key } = req.body;

    console.log(req.body);
    const Nkey = Buffer.from(key, 'base64');
    const Niv = Buffer.from(iv, 'base64');

    console.log("Nkey:", Nkey);
    console.log("Niv:", Niv);

    if (Niv.length !== 16) {
        return res.status(400).json({ message: 'Invalid initialization vector' });
    }

    const decryptedUserId = decrypt(encrypt, Nkey, Niv);
    console.log("Decrypt:", decryptedUserId);
    id = decryptedUserId;
    console.log(req.body);

    if (!id) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    // Does the user exist to update?
    const user = await User.findById(id).exec();

    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    // Check for duplicate username or email, excluding the current user
    const duplicateUsername = await User.findOne({ username, _id: { $ne: id } }).lean().exec();
    const duplicateEmail = await User.findOne({ email, _id: { $ne: id } }).lean().exec();

    if (duplicateUsername) {
        return res.status(409).json({ message: 'Duplicate username' });
    }

    if (duplicateEmail) {
        return res.status(409).json({ message: 'Duplicate email' });
    }

    // Update fields only if they are provided
    if (username) user.username = username;
    if (email) user.email = email;
    if (Array.isArray(roles) && roles.length) user.roles = roles;
    if (typeof active === 'boolean') user.active = active;
    if (card_number) user.card_number = card_number;
    if (year_study) user.year_study = year_study;
    if (events) user.events = events;
    if (eventAttendance) user.eventAttendance = eventAttendance;

    if (password) {
        // Hash password
        user.password = await bcrypt.hash(password, 10); // salt rounds
    }

    const updatedUser = await user.save();

    res.json({ message: `${updatedUser.username} updated` });
});

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.body;

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'User ID Required' });
    }

    // Does the user still have assigned events?
    const event = await Event.findOne({ user: id }).lean().exec();
    if (event) {
        return res.status(400).json({ message: 'User has assigned events' });
    }

    // Does the user exist to delete?
    const user = await User.findById(id).exec();

    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    const result = await user.deleteOne();

    const reply = `Username ${result.username} with ID ${result._id} deleted`;

    res.json(reply);
});

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
};
