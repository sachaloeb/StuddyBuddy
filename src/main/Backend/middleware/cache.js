const redis = require("redis");

const client = redis.createClient({
    socket: { host: "127.0.0.1", port: 6379 },
});

client.connect().catch(console.error);

const cache = async (req, res, next) => {
    console.log("✅ Cache middleware triggered for:", req.originalUrl); // Debugging log

    const key = req.originalUrl;
    const cachedData = await client.get(key);

    if (cachedData) {
        console.log("✅ Serving from cache");
        return res.json(JSON.parse(cachedData)); // Serve cached data
    }

    res.sendResponse = res.json;
    res.json = (body) => {
        client.setEx(key, 300, JSON.stringify(body)); // Cache response for 5 minutes
        res.sendResponse(body);
    };

    next();
};

module.exports = cache;
