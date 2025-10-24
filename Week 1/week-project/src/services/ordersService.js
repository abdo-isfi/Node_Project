//ordersService.js
const fs = require('fs');
const path = require('path');

const ordersFilePath = path.join(__dirname, '../../data/orders.json');

const readOrdersFile = () => {
    try {
        const data = fs.readFileSync(ordersFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading orders file:', error);
        return [];
    }
};

const getOrders = ({ status, from, to, page = 1, limit = 10 }) => {
    let orders = readOrdersFile();

    if (status) {
        orders = orders.filter(order => order.status.toLowerCase() === status.toLowerCase());
    }

    if (from) {
        const fromDate = new Date(from);
        orders = orders.filter(order => new Date(order.date) >= fromDate);
    }

    if (to) {
        const toDate = new Date(to);
        orders = orders.filter(order => new Date(order.date) <= toDate);
    }

    const total = orders.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedOrders = orders.slice(startIndex, endIndex);
    const pages = Math.ceil(total / limit);

    return { orders: paginatedOrders, total, pages };
};

const getOrderById = (id) => {
    const orders = readOrdersFile();
    return orders.find(order => order.id === id);
};

const getOrderByOrderNumber = (orderNumber) => {
    const orders = readOrdersFile();
    return orders.find(order => order.orderNumber === orderNumber);
};

module.exports = {
    getOrders,
    getOrderById,
    getOrderByOrderNumber,
};
