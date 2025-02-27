const client = require("../config/redisClient");

const cache = (req, res, next) => {
    const userId = req.params.userId;

    client.get(userId, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        }

        if (data !== null) {
            res.send(data);
        } else {
            next();
        }
    });
};

module.exports = cache;