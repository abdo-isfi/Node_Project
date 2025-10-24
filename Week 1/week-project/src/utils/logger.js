//logger.js

const EventEmitter = require('events');

class Logger extends EventEmitter {}

const logger = new Logger();

logger.on('request:received', ({ method, url }) => {
    console.log(`[${new Date().toISOString()}] Request received: ${method} ${url}`);
});

logger.on('response:sent', ({ statusCode, route }) => {
    console.log(`[${new Date().toISOString()}] Response sent: ${statusCode} for route ${route}`);
});

module.exports = logger;
