const http = require('http');

const server = http.createServer((req, res) => {

    // Home → HTML
    if (req.url === '/' || req.url === '/home') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <h1>Welcome to HTTP Server</h1>
            <p>This is HTML response</p>
            <a href="/json">Go to JSON</a><br>
            <a href="/text">Go to Text</a>
        `);

    // JSON response
    } else if (req.url === '/json') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        const data = {
            message: "Hello from server",
            status: "success"
        };
        res.end(JSON.stringify(data));

    // Plain text response
    } else if (req.url === '/text') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('This is plain text response');

    // 404 response
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

// Start server
server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
