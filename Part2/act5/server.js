// l import dyal module http
const http = require('http');

// nsawb server
const server = http.createServer((req, res) => {
    // n3tiw radd 3la talab dyal l user
    if (req.url === '/') {
        res.write('Welcome to the Home Page!');
        res.end();
        // n3tiw radd 3la talab dyal /api/etudiants
    } else if (req.url === '/api/etudiants') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify([{ id: 1, name: 'Ali' }, { id: 2, name: 'Sara' }]));
        // n3tiw radd 3la talab akhor
    } else {
        res.writeHead(404);
        res.end('Page not found');
    }
});

// nbdaw server 3la port 3000
server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});