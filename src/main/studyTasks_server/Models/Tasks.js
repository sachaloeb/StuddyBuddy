const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        author: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
        description: { type: String, required: false },
        startDate: { type: Date, default: null },
        dueDate: {
            type: Date,
            required: true,
            validate: {
                validator: function(v) {
                    return v >= this.startDate;
                },
                message: "Due date must be after the start date."
            }
        },
        type: { type: String,
            enum: ["Class", "Assignment", "Exam", "Study Time", "Personal", "Professional", "Break"],
            default: "Personal" },
        priority: { type: String, enum: ["Low", "Medium", "High"],default: "Low" },
        IsCompleted: { type: Boolean, default: false },
    },
    {timestamps: true},
    { collection: 'tasks' }
);

//TaskSchema.index({ author: 1, dueDate: 1, completed: 1 });

const Tasks = mongoose.model('Task', TaskSchema);
module.exports = Tasks;