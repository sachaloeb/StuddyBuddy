const cron = require("node-cron");
const BreakReminder = require("../Models/BreakReminder");

// Store reminders per user (Temporary storage - can be replaced with a DB)
let breakReminders = {};

// 🔥 Function to create and save a break reminder for a user

// 🔥 Function to add a break reminder (Now works via POST request)
const addBreakReminder = async (req, res) => {
    try {
        const userId = req.user.id;
        const { message } = req.body; // Allow custom messages

        const reminder = new BreakReminder({
            userId,
            message: message || "⏳ Time for a break! Stay refreshed and productive."
        });

        await reminder.save();
        res.status(201).json({ message: "Break reminder added successfully!" });
    } catch (error) {
        console.error("❌ Error saving break reminder:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// 🔥 Schedule reminders every 25 minutes
cron.schedule("*/25 * * * *", async () => {
    console.log("⏰ Sending Pomodoro Break Reminders...");
    // Fetch all users and add reminders for them (this assumes all users get reminders)
    // If user customization is needed, modify this logic.
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

module.exports = { getBreakReminders, addBreakReminder };