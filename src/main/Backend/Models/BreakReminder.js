const mongoose = require("mongoose");

const BreakReminderSchema = new mongoose.Schema({
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        message: {
            type: String,
            required: true
        },
        time: {
            type: Date,
            required: true
        },
        timestamp: {
            type: Date,
            default: Date.now
        }
},
    {timestamps: true},
    { collection: 'break reminders' }
);

const BreakReminder = mongoose.model("BreakReminder", BreakReminderSchema);
module.exports = BreakReminder;
