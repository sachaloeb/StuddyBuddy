const express = require('express');
const Task = require('../Models/Tasks');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Get all tasks for logged-in user
router.get('/', authMiddleware, async (req, res) => {
    try {
        const tasks = await Task.find({ author: req.user.id });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
});

// Create a new task (only for authenticated users)
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { name, description, startDate, dueDate, type, priority, IsCompleted } = req.body;

        if (!name || !dueDate || !type) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const newTask = new Task({
            name,
            author: req.user.id, // Ensure user ID is being set correctly
            description,
            startDate,
            dueDate,
            type,
            priority,
            IsCompleted
        });

        await newTask.save();
        res.status(201).json(newTask);
    } catch (err) {
        console.error("Error saving task:", err);
        res.status(500).json({ message: "Server Error", error: err.message });
    }
});


module.exports = router;
