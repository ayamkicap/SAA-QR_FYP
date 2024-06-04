const { logEvents } = require('./logger')
const connectDB = require('../config/dbConn');
const mongoose = require('mongoose');

const errorHandler = async (err, req, res, next) => {
    logEvents(`${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errLog.log')
    console.log(err.stack)

    const status = res.statusCode ? res.statusCode : 500 // server error 

    res.status(status)

    res.json({ message: err.message })

    try {
        const db = await connectDB();
        const collection = db.collection('errorLogs');
        
        const log = {
            name: err.name,
            message: err.message,
            method: req.method,
            url: req.url,
            origin: req.headers.origin,
            stack: err.stack,
            timestamp: new Date()
        };

        await collection.insertOne(log);
        console.log('Error logged to MongoDB');
    } catch (dbError) {
        console.error('Failed to log error to MongoDB', dbError);
    }
};

module.exports = errorHandler 