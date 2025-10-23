const parseQuery = (query) => {
    const parsed = {};
    for (const key in query) {
        if (query.hasOwnProperty(key)) {
            parsed[key] = query[key];
        }
    }
    return parsed;
};

module.exports = { parseQuery };
