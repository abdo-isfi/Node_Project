// l import dyal fs w EventEmitter
const fs = require('fs');
const EventEmitter = require('events');

// l class Logger katwarri EventEmitter
class Logger extends EventEmitter {
    log(message) {
        fs.appendFileSync("log.txt", message + "\n");
        this.emit("messageLogged", { message ,datr: new Date()});
    }
}
// Export dyal Logger class
module.exports = Logger;