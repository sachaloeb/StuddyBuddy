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

        const { name, startDate = null, endDate, priority = "Low", type } = req.body;

        if (!name || !startDate || !endDate || !type) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        const task = new Task({ author: userId, name, startDate, dueDate: endDate, priority, type });
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


module.exports = { getTasks, createTask };