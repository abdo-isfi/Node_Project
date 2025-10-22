// darna l import dyal EventEmitter mn module dyal events
const EventEmitter = require('events');

// nsawb class Logger li katwarri EventEmitter
class Logger extends EventEmitter {
    // method dyal log li katakhod message w katdir log w katb3at event
    log(message) {
        console.log("LOG : " ,message);
        this.emit('messageLogged', { message, date: new Date() });
    }
}
// nsawb export dyal Logger bach n9dro nst3mlo f modules okhrin
module.exports = Logger;