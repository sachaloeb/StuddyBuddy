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

// Update a task by ID
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const { name, description, startDate, dueDate, type, priority, IsCompleted } = req.body;

        let task = await Task.findById(req.params.id);
        if (!task || task.author.toString() !== req.user.id) {
            return res.status(404).json({ message: "Task not found" });
        }

        task.name = name || task.name;
        task.description = description || task.description;
        task.startDate = startDate || task.startDate;
        task.dueDate = dueDate || task.dueDate;
        task.type = type || task.type;
        task.priority = priority || task.priority;
        task.IsCompleted = IsCompleted !== undefined ? IsCompleted : task.IsCompleted;

        await task.save();
        res.json(task);
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
});

// Delete a task by ID
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        if (task.author.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: "Task deleted successfully" });
    } catch (err) {
        console.error("Error deleting task:", err);
        res.status(500).json({ message: "Server Error", error: err.message });
    }
});



module.exports = router;
