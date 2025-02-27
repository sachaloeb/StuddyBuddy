const express = require('express');
const Task = require('../Models/Tasks');
const { getTasks, createTask, updateTask, deleteTask } = require("../controllers/taskController");
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

router.put("/:id", authMiddleware, updateTask);

router.delete("/:id", authMiddleware, deleteTask);

module.exports = router;