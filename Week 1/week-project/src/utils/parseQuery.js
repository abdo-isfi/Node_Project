//parseQuery.js
const parseQuery = (query) => {
    const parsed = {};
    for (const key in query) {
        if (Object.prototype.hasOwnProperty.call(query, key)) {
            parsed[key] = query[key];
        }
    }
    return parsed;
};

module.exports = parseQuery;
