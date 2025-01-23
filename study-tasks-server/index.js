const http = require('http');

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/tasks') {
        // Hardcoded study tasks
        const studyTasks = [
            { id: 1, task: "Complete Math homework", dueDate: "2025-01-25" },
            { id: 2, task: "Read Chapter 3 of Science", dueDate: "2025-01-26" },
            { id: 3, task: "Review History notes", dueDate: "2025-01-27" }
        ];

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(studyTasks));
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
