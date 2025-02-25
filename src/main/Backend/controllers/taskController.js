const Task = require("../models/Tasks");
const redis = require("../middleware/cache");

// 🔥 GET /tasks - Fetch paginated & filtered tasks (for logged-in user)
const getTasks = async (req, res, next) => {
    try {
        const userId = req.user.id; // Get logged-in user ID
        console.log("Fetching tasks for user:", userId); // Debugging Log

        const { page = 1, limit = 10, priority, dueDate } = req.query;

        let filter = { author: userId }; // Fix: Ensure tasks are filtered by "author" field

        if (priority) filter.priority = priority;
        if (dueDate) filter.dueDate = { $lte: new Date(dueDate) };

        const tasks = await Task.find(filter)
            .limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit))
            .sort({ dueDate: 1 });

        const totalTasks = await Task.countDocuments(filter);

        console.log("Total tasks found:", totalTasks); // Debugging Log

        res.json({
            tasks,
            page: parseInt(page),
            totalPages: Math.ceil(totalTasks / limit),
            totalTasks
        });
    } catch (error) {
        console.error("Error fetching tasks:", error);
        next(error);
    }
};

// 🔥 POST /tasks - Create a new task (for logged-in user)
const createTask = async (req, res, next) => {
    try {
        const userId = req.user.id; // Get logged-in user ID
        console.log("Creating task for user:", userId); // Debugging Log

        const { name, startDate=null, endDate, priority = "Low", type } = req.body;

        // Validate required fields
        if (!name || !startDate || !endDate || !type) {
            console.log(name);
            console.log(startDate);
            console.log(endDate);
            console.log(type);
            return res.status(400).json({ message: "All fields are required!" });
        }

        const task = new Task({ author: userId, name, startDate, dueDate: endDate, priority, type });
        await task.save();

        console.log("Task created successfully:", task);
        res.status(201).json({ message: "Task created successfully!", task });
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
        next(error);
    }
};

module.exports = { getTasks, createTask };