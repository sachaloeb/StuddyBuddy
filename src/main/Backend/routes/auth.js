const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/Users');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key"; // Change this to a secure environment variable

// Store active break reminders
const activeReminders = {};

// Function to start break reminders for a user
const startBreakReminder = (userId) => {
    if (activeReminders[userId]) {
        clearInterval(activeReminders[userId]); // Clear existing reminder if exists
    }
    activeReminders[userId] = setInterval(() => {
        console.log(`Reminder: User ${userId}, it's time to take a break!`);
        // Here you can add logic to notify the user via WebSocket, email, or frontend alert
    }, 60 * 60 * 1000); // Default: every 60 minutes
};

// Register User
router.post('/register', async (req, res) => {
    try {
        const { username, FirstName, LastName, email, password } = req.body;

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists" });

        // Create new user
        user = new User({ username, FirstName, LastName, email, password });
        await user.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
});

// Login User
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

        // Start break reminder when user logs in
        startBreakReminder(user._id);

        res.json({ token, message: "Login successful. Break reminders activated." });
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
