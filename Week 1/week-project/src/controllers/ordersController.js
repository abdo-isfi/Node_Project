const { getOrders, getOrderById, getOrderByOrderNumber } = require('../services/ordersService');
const { sendJson } = require('../utils/sendJson');
const { parseQuery } = require('../utils/parseQuery');

const ordersController = (req, res, pathname, query, logResponse) => {
    if (req.method === 'GET') {
        if (pathname === '/api/orders') {
            const { status, from, to, page, limit } = parseQuery(query);
            const { orders, total, pages } = getOrders({ status, from, to, page, limit });
            sendJson(res, { orders, total, page: parseInt(page) || 1, pages });
            logResponse(200);
        } else if (pathname.match(/^\/api\/orders\/number\/[^/]+$/)) {
            const orderNumber = pathname.split('/')[4];
            const order = getOrderByOrderNumber(orderNumber);
            if (order) {
                sendJson(res, order);
                logResponse(200);
            } else {
                sendJson(res, { error: 'Order not found' }, 404);
                logResponse(404);
            }
        } else if (pathname.match(/^\/api\/orders\/[^/]+$/)) {
            const id = pathname.split('/')[3];
            const order = getOrderById(id);
            if (order) {
                sendJson(res, order);
                logResponse(200);
            } else {
                sendJson(res, { error: 'Order not found' }, 404);
                logResponse(404);
            }
        } else {
            sendJson(res, { error: 'Not Found' }, 404);
            logResponse(404);
        }
    } else {
        sendJson(res, { error: 'Method Not Allowed' }, 405);
        logResponse(405);
    }
};

module.exports = ordersController;
