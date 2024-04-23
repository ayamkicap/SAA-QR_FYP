const express = require('express')
const router = express.Router()
const eventsController = require('../controllers/eventController')
const multer = require('multer');
const bodyParser = require('body-parser')
const uuid = require('uuid')

// const verifyJWT = require('../middleware/verifyJWT')

// router.use(verifyJWT)

// Set storage engine for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Destination folder where files will be saved
    },
    filename: function (req, file, cb) {
        // Generate a random filename using uuid
        const randomFilename = uuid.v4(); // Generates a random UUID
        const fileExtension = file.originalname.split('.').pop(); // Get file extension
        const finalFilename = `${randomFilename}.${fileExtension}`; // Concatenate filename with extension
        cb(null, finalFilename);
    }
});

// Initialize multer upload with increased payload size limit (e.g., 50MB)
const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 50 * 1024 * 1024, // 50MB limit
    }
});

// Initialize multer upload
//const upload = multer({ storage: storage });

router.route('/')
    .get(eventsController.getAllEvents)
    .post(upload.single('img_url_event'), (req, res, next) => {
        next(); // Call next to proceed to the next middleware or route handler
    }, eventsController.createNewEvent) // Specify image upload middleware
    .patch(upload.single('img_url_event'), eventsController.updateEvent) // Specify image upload middleware
    .delete(eventsController.deleteEvent);

module.exports = router;
