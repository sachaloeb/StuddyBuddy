const redis = require("redis");

const client = redis.createClient({
    url: "redis://localhost:6379"
});

client.on("connect", () => {
    console.log("Connected to Redis");
});

client.on("error", (err) => {
    console.error("Redis error:", err);
});

// Ensure Redis is connected before exporting
(async () => {
    try {
        await client.connect();
    } catch (err) {
        console.error("Redis connection error:", err);
    }
})();

module.exports = client;
