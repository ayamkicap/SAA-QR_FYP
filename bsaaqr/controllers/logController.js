// controllers/logController.js
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const getLogsFromMongoDB = async (req, res) => {
    try {
        const db = mongoose.connection;
        const logs = await db.collection('logs').find({}).toArray();
        res.status(200).json(logs);
    } catch (err) {
        console.error('Error fetching logs from MongoDB:', err);
        res.status(500).json({ message: 'Error fetching logs from MongoDB' });
    }
};

const getLogsFromFileSystem = async (req, res) => {
    try {
        const logDirectory = path.join(__dirname, '..', 'logs');
        const logFiles = await fs.promises.readdir(logDirectory);
        let logs = [];

        for (const logFile of logFiles) {
            const logPath = path.join(logDirectory, logFile);
            const logData = await fs.promises.readFile(logPath, 'utf8');
            logs.push({ fileName: logFile, logData });
        }

        res.status(200).json(logs);
    } catch (err) {
        console.error('Error fetching logs from file system:', err);
        res.status(500).json({ message: 'Error fetching logs from file system' });
    }
};

module.exports = {
    getLogsFromMongoDB,
    getLogsFromFileSystem,
};
