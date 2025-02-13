const express = require("express");
const { getBreakReminders, addBreakReminder } = require("../controllers/breakReminders");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// 🔥 Route to fetch break reminders (Protected)
router.get("/", authMiddleware, getBreakReminders);

// 🔥 Route to manually add a break reminder (Protected)
router.post("/", authMiddleware, addBreakReminder);

module.exports = router;