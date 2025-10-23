// l import dyal modules
const http = require('http');
const Logger = require('./logger');
const logger = new Logger();

// Sme3 l event messageLogged
logger.on('messageLogged', (data) => 
    console.log('Message logged:', data)
);

// n0ado server HTTP
const server = http.createServer((req, res) => {
    logger.log(`Received request:  ${req.url}`);
    res.end("request enregistered !");
});

// Sme3 3la port 4000
server.listen(4000, () => 
    console.log('Server listening on port 4000')
);
