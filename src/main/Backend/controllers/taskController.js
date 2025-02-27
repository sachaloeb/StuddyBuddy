const Task = require("../models/Tasks");
const client = require("../config/redisClient");

const getTasks = async (req, res, next) => {
    try {
        const userId = req.user.id;
        console.log("Fetching tasks for user:", userId);

        const { page = 1, limit = 10, priority, dueDate } = req.query;
        let filter = { author: userId };

        if (priority) filter.priority = priority;
        if (dueDate) filter.dueDate = { $lte: new Date(dueDate) };

        const cacheKey = `tasks:${userId}`;

        // Check Redis cache using async/await
        try {
            console.log(`Checking cache for user ${userId}`);
            const cachedData = await client.get(cacheKey);
            if (cachedData) {
                console.log("Cache hit");
                return res.json(JSON.parse(cachedData));
            } else {
                console.log("Cache miss");
            }
        } catch (redisErr) {
            console.error("Redis error:", redisErr);
        }

        console.log("Cache miss");
        const tasks = await Task.find(filter)
            .limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit))
            .sort({ dueDate: 1 });

        const totalTasks = await Task.countDocuments(filter);

        console.log("Total tasks found:", totalTasks);

        const response = {
            tasks,
            page: parseInt(page),
            totalPages: Math.ceil(totalTasks / limit),
            totalTasks
        };

        // Store response in Redis
        try {
            console.log(`Storing tasks in cache for user ${userId}`);
            await client.setEx(cacheKey, 3600, JSON.stringify(response));
            console.log("Cache successfully set!");
        } catch (redisErr) {
            console.error("Redis error while setting cache:", redisErr);
        }

        // **Wait for Redis to finish storing before sending response**
        await new Promise(resolve => setTimeout(resolve, 100));

        res.json(response);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        next(error);
    }
};




const createTask = async (req, res, next) => {
    try {
        const userId = req.user.id;
        console.log("Creating task for user:", userId);

        const { name, startDate = null, dueDate, priority = "Low", type, IsCompleted = false } = req.body;

        if (!name || !startDate || !dueDate || !type) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        const task = new Task({ author: userId, name, startDate, dueDate, priority, type, IsCompleted });
        await task.save();

        console.log("Task created successfully:", task);

        // Clear cache for this user since tasks have changed
        try {
            await client.del(`tasks:${userId}`);
        } catch (redisErr) {
            console.error("Redis error while clearing cache:", redisErr);
        }

        res.status(201).json({ message: "Task created successfully!", task });
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
        next(error);
    }
};

const updateTask = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const taskId = req.params.id;
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

        try {
            await client.del(`tasks:${userId}`);
        } catch (redisErr) {
            console.error("Redis error while clearing cache:", redisErr);
        }

        res.json(task);
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};

const deleteTask = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const taskId = req.params.id;
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        if (task.author.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        await Task.findByIdAndDelete(taskId);

        try {
            await client.del(`tasks:${userId}`);
        } catch (redisErr) {
            console.error("Redis error while clearing cache:", redisErr);
        }

        res.json({ message: "Task deleted successfully" });
    } catch (err) {
        console.error("Error deleting task:", err);
        res.status(500).json({ message: "Server Error", error: err.message });
        next(err);
    }
};


module.exports = { getTasks, createTask, updateTask, deleteTask };