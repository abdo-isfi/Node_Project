// l import dyal Logger mn logger.js
const Logger = require('./logger');
// nsawb instance jdida mn Logger
const logger = new Logger();
// nssajlo listener 3la event dyal messageLogged
logger.on('messageLogged', (data) => {
    console.log('Evenement capturé :', data);
});

// nst3mlo method dyal log bach nbdlo message
logger.log("Application started !");
