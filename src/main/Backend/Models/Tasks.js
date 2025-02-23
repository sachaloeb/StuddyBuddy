const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
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

TaskSchema.index({ author: 1, dueDate: 1, completed: 1 }, function(err, result) {
    if (err) {
        console.error("Error creating index:", err);
    } else {
        console.log("Index created:", result);
    }
});

const Tasks = mongoose.models.Task || mongoose.model('Task', TaskSchema);

const displayIndexes = async () => {
    const indexes = await Tasks.collection.getIndexes();
    console.log("Indexes:", indexes);
};

displayIndexes();

module.exports = Tasks;