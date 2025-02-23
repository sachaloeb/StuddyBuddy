const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const errorHandler = require("./middleware/errorHandler");
const logger = require("./middleware/logger");
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const breakRoutes = require("./routes/breakRoutes");
const apiLimiter = require("./middleware/rateLimiter");
const port = process.env.PORT || 3002;

dotenv.config();
app.use(express.json()); // Middleware to parse JSON requests
app.use(express.urlencoded({ extended: false }));
app.use(cors()); // Enable CORS for all routes

// ✅ Log only in development mode
if (process.env.NODE_ENV === "development") {
    app.use(logger);
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', apiLimiter,taskRoutes);
app.use("/api/break-reminders", apiLimiter,breakRoutes);
app.use(errorHandler);

// Start the server
mongoose.connect('mongodb+srv://sachaloeb:xfBD6K8Vpm6GTmNx@cluster0.3fjol.mongodb.net/StuddyBuddyDB?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log('Connected to MongoDB')
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    }).catch(err => console.error('Could not connect to MongoDB', err));