//server.js
const http = require('http');
const url = require('url');
const router = require('./router');
const { sendJson } = require('./utils/sendJson');
const logger = require('./utils/logger');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    logger.emit('request:received', { method: req.method, url: req.url });

    const { pathname, query } = url.parse(req.url, true);

    if (pathname === '/health') {
        return sendJson(res, { status: 'ok', uptime: process.uptime(), timestamp: new Date().toISOString() });
    }

    // Delegate to router for API requests
    router(req, res);
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
