const validateTask = (req, res, next) => {
    const { name, dueDate, priority } = req.body;

    if (!name || typeof name !== "string") {
        return res.status(400).json({ message: "Task name is required and must be a string" });
    }

    if (dueDate && isNaN(Date.parse(dueDate))) {
        return res.status(400).json({ message: "Invalid due date format" });
    }

    if (priority && !["Low", "Medium", "High"].includes(priority)) {
        return res.status(400).json({ message: "Priority must be Low, Medium, or High" });
    }

    next();
};

module.exports = validateTask;