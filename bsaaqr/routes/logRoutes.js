// routes/logRoutes.js
const express = require('express');
const router = express.Router();
const logController = require('../controllers/logController');

router.get('/mongo', logController.getLogsFromMongoDB);
router.get('/filesystem', logController.getLogsFromFileSystem);

module.exports = router;
