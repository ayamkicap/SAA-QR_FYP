const { format } = require('date-fns')
const { v4: uuid } = require('uuid')
const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')
const connectDB = require('../config/dbConn');
const mongoose = require('mongoose');

const logEvents = async (message, logFileName) => {
    const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss')
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`

    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFileName), logItem)

        // // Log to MongoDB
        const db = mongoose.connection;
        const logCollection = db.collection('logs');

        // const log = {
        //     dateTime,
        //     id: uuid(),
        //     message,
        //     logFileName,
        //     timestamp: new Date()
        // };

        await logCollection.insertOne(log);
        console.log('Log event recorded in MongoDB');
    } catch (err) {
        console.log(err)
    }

    
}

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log')
    console.log(`${req.method} ${req.path}`)
    next()

    
}

module.exports = { logEvents, logger }