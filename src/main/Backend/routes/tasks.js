const express = require('express');
const Task = require('../Models/Tasks');
const { getTasks, createTask } = require("../controllers/taskController");
const authMiddleware = require('../middleware/auth');
const validateTask = require("../middleware/validateTask");
const client = require('../config/redisClient');
const router = express.Router();

// Ensure Redis client is connected
if (!client) {
    console.error("Redis client is undefined! Check redisClient.js");
}

client.on('error', (err) => {
    console.error('Redis error:', err);
});

// Middleware to check cache
const checkCache = async (req, res, next) => {
    const { userId } = req.params;
    try {
        const data = await client.get(`tasks:${userId}`);
        if (data) {
            console.log('Cache hit');
            return res.json(JSON.parse(data));
        } else {
            console.log('Cache miss');
            next();
        }
    } catch (err) {
        console.error("Redis error:", err);
        next();
    }
};

// Route to get tasks
router.get('/:userId', checkCache, async (req, res) => {
    try {
        const { userId } = req.params;
        const tasks = await Task.find({ userId });

        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.get("/", authMiddleware, getTasks);
router.post("/", authMiddleware, validateTask, createTask);

router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const { name, startDate, dueDate, type, priority, IsCompleted } = req.body;

        let task = await Task.findById(req.params.id);
        if (!task || task.author.toString() !== req.user.id) {
            return res.status(404).json({ message: "Task not found" });
        }

        task.name = name || task.name;
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

router.delete("/:id", authMiddleware, async (req, res) => {
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