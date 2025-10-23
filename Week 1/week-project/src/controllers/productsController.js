const { getProducts, getProductById, getProductBySku } = require('../services/productsService');
const { sendJson } = require('../utils/sendJson');
const { parseQuery } = require('../utils/parseQuery');

const productsController = (req, res, pathname, query, logResponse) => {
    if (req.method === 'GET') {
        if (pathname === '/api/products') {
            const { q, category, minPrice, maxPrice, inStock, page, limit } = parseQuery(query);
            const { products, total, pages } = getProducts({ q, category, minPrice, maxPrice, inStock, page, limit });
            sendJson(res, { products, total, page: parseInt(page) || 1, pages });
            logResponse(200);
        } else if (pathname.match(/^\/api\/products\/sku\/[^/]+$/)) {
            const sku = pathname.split('/')[4];
            const product = getProductBySku(sku);
            if (product) {
                sendJson(res, product);
                logResponse(200);
            } else {
                sendJson(res, { error: 'Product not found' }, 404);
                logResponse(404);
            }
        } else if (pathname.match(/^\/api\/products\/[^/]+$/)) {
            const id = pathname.split('/')[3];
            const product = getProductById(id);
            if (product) {
                sendJson(res, product);
                logResponse(200);
            } else {
                sendJson(res, { error: 'Product not found' }, 404);
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

module.exports = productsController;
