const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema(
    {
            username: { type: String, required: true, unique: true },
            FirstName: { type: String, required: true },
            LastName: { type: String, required: true },
            email: { type: String, required: true, unique: true },
            password: { type: String, required: true },
            createdAt: { type: Date, default: Date.now },
    },
    {timestamps: true},
    { collection: 'users' }
);

// Hash password before saving
UserSchema.pre('save', async function (next) {
        if (!this.isModified('password')) return next();
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
});

const Users = mongoose.models.User || mongoose.model('User', UserSchema);
module.exports = Users;