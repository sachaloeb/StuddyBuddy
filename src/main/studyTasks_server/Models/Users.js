const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        _id: { type: String, required: [true,"Please give me a username"] },
        FirstName: { type: String, required: true },
        LastName: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
    },
    {timestamps: true},
    { collection: 'users' }
);

const Users = mongoose.model('User', UserSchema);
module.exports = Users;