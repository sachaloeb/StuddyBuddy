const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // Middleware to parse JSON requests

// Temporary in-memory data store
let tasks = [];
let currentId = 1;

// Add a new task
app.post('/tasks/add', (req, res) => {
    const { name, description } = req.body;
    const task = { id: currentId++, name, description, completed: false };
    tasks.push(task);
    res.status(201).json(task);
});

// Get all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Edit an existing task
app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { name, description, completed } = req.body;
    const task = tasks.find(t => t.id === parseInt(id));

    if (task) {
        if (name !== undefined) task.name = name;
        if (description !== undefined) task.description = description;
        if (completed !== undefined) task.completed = completed;
        res.json(task);
    } else {
        res.status(404).json({ error: "Task not found" });
    }
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const taskIndex = tasks.findIndex(t => t.id === parseInt(id));

    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ error: "Task not found" });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
