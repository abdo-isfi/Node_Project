//productsService.js
const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../../data/products.json');

const readProductsFile = () => {
    try {
        const data = fs.readFileSync(productsFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading products file:', error);
        return [];
    }
};

const getProducts = ({ q, category, minPrice, maxPrice, inStock, page = 1, limit = 10 }) => {
    let products = readProductsFile();

    if (q) {
        const searchLower = q.toLowerCase();
        products = products.filter(p => 
            p.name.toLowerCase().includes(searchLower) || 
            p.description.toLowerCase().includes(searchLower)
        );
    }

    if (category) {
        products = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    if (minPrice !== undefined) {
        products = products.filter(p => p.price >= parseFloat(minPrice));
    }

    if (maxPrice !== undefined) {
        products = products.filter(p => p.price <= parseFloat(maxPrice));
    }

    if (inStock !== undefined) {
        const inStockBool = inStock === 'true';
        products = products.filter(p => p.inStock === inStockBool);
    }

    const total = products.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = products.slice(startIndex, endIndex);
    const pages = Math.ceil(total / limit);

    return { products: paginatedProducts, total, pages };
};

const getProductById = (id) => {
    const products = readProductsFile();
    return products.find(p => p.id === id);
};

const getProductBySku = (sku) => {
    const products = readProductsFile();
    return products.find(p => p.sku === sku);
};

module.exports = {
    getProducts,
    getProductById,
    getProductBySku,
};
