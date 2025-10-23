// logger.js
// 💬 had fichier kayt7emmel f logging (katkteb f log.txt) o kaymchi b system dyal EventEmitter

const fs = require('fs');
const path = require('path');
const EventEmitter = require('events');

// 📄 smiya dyal fichier dyal logs
const LOG_FILE = path.join(__dirname, 'log.txt');

class Logger extends EventEmitter {
  constructor(logFile = LOG_FILE) {
    super();
    this.logFile = logFile;

    // 👀 katchouf wach fichier log.txt kayna, ila ma kaynash tandiro la creation liha
    try {
      if (!fs.existsSync(this.logFile)) {
        fs.writeFileSync(this.logFile, '', { flag: 'w' });
      }
    } catch (err) {
      // ⛔ ila t9a error, kaydir emit dyal event 'error'
      process.nextTick(() => this.emit('error', err));
    }
  }

  // 🕒 had fonction katdir timestamp (HH:MM:SS)
  _timeStamp() {
    const d = new Date();
    const hh = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    const ss = String(d.getSeconds()).padStart(2, '0');
    return `${hh}:${mm}:${ss}`;
  }

  // 🧾 had log() katkteb message f fichier
  log(message) {
    const ts = this._timeStamp();
    const line = typeof message === 'string'
      ? `[${ts}] ${message}`
      : `[${ts}] ${JSON.stringify(message)}`;

    // ✍️ katkteb ligne f fichier log.txt
    fs.appendFile(this.logFile, line + '\n', (err) => {
      if (err) {
        this.emit('error', err);
      } else {
        // 📢 event katsmi messageLogged bach t3ref bli katkteb
        this.emit('messageLogged', { timestamp: ts, message: message });
      }
    });
  }
}

module.exports = Logger;
