const rateLimit = require("express-rate-limit");

// ✅ Limit API requests to prevent abuse
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // ⏳ 15 minutes
    max: 100, // 🚀 Allow 100 requests per window
    message: {
        message: "⚠️ Too many requests, please try again later."
    }
});

module.exports = apiLimiter;