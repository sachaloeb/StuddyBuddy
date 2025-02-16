const mongoose = require("mongoose");

const BreakReminderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
    message: { type: String, default: "⏳ Time for a break! Stay refreshed and productive." },
    timestamp: { type: Date, default: Date.now }
},
    {timestamps: true},
    { collection: 'break reminders' }
);

const BreakReminder = mongoose.model("BreakReminder", BreakReminderSchema);
module.exports = BreakReminder;
