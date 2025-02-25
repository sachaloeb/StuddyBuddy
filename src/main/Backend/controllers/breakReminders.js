const cron = require("node-cron");
const BreakReminder = require("../Models/BreakReminder");



// 🔥 Function to add a break reminder (Now works via POST request)
// src/main/Backend/controllers/breakReminders.js
const addBreakReminder = async (req, res) => {
    try {
        const userId = req.user.id;
        const { message, time } = req.body;
        const newReminder = new BreakReminder({
            userId,
            message,
            time: new Date(time), // Parse the ISO string to a Date object
        });
        const savedReminder = await newReminder.save();
        res.status(201).json(savedReminder);
    } catch (error) {
        console.error('Error adding reminder:', error);
        res.status(500).json({ error: 'Failed to add reminder' });
    }
};

// 🔥 Schedule reminders every 25 minutes
cron.schedule("*/25 * * * *", async () => {
    console.log("⏰ Sending Pomodoro Break Reminders...");
    try {
        const users = await User.find(); // Fetch all users
        const reminderPromises = users.map(user => {
            const reminder = new BreakReminder({
                userId: user._id,
                message: "⏳ Time for a break! Stay refreshed and productive."
            });
            return reminder.save();
        });
        await Promise.all(reminderPromises);
        console.log("✅ Break reminders added for all users.");
    } catch (error) {
        console.error("❌ Error adding break reminders:", error);
    }
});

// 🔥 GET /break-reminders - Fetch user-specific reminders
const getBreakReminders = async (req, res) => {
    try {
        const userId = req.user.id;
        const reminders = await BreakReminder.find({ userId }).sort({ timestamp: -1 }).limit(5);
        if (reminders.length === 0) {
            return res.status(200).json({ message: "No break reminders yet!" });
        }
        res.json(reminders);
    } catch (error) {
        console.error("❌ Error fetching break reminders:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

const deleteBreakReminder = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const reminder = await BreakReminder.findOneAndDelete({ _id: id, userId });
        if (!reminder) {
            return res.status(404).json({ message: "Reminder not found" });
        }
        res.status(200).json({ message: "Reminder deleted successfully" });
    } catch (error) {
        console.error("Error deleting reminder:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = { getBreakReminders, addBreakReminder, deleteBreakReminder };