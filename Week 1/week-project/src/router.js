//router.js
const url = require('url');
const productsController = require('./controllers/productsController');
const ordersController = require('./controllers/ordersController');
const { sendJson } = require('./utils/sendJson');
const logger = require('./utils/logger');

const router = (req, res) => {
    const { pathname, query } = url.parse(req.url, true);

    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    // Log response sent for all requests handled by the router
    const logResponse = (statusCode) => {
        logger.emit('response:sent', { statusCode, route: pathname });
    };

    if (pathname.startsWith('/api/products')) {
        productsController(req, res, pathname, query, logResponse);
    } else if (pathname.startsWith('/api/orders')) {
        ordersController(req, res, pathname, query, logResponse);
    } else {
        sendJson(res, { error: 'Not Found' }, 404);
        logResponse(404);
    }
};

module.exports = router;
