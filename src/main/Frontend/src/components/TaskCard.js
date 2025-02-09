import React from "react";

const TaskCard = ({ task, handleToggleTaskCompletion }) => {
    return (
        <div className={`task-card ${task.IsCompleted ? "completed" : ""}`} key={task.id}>
            <h3>{task.name}</h3>
            <p>Due: {new Date(task.dueDate).toLocaleString()}</p>
            <label>
                <input
                    type="checkbox"
                    checked={task.IsCompleted}
                    onChange={() => handleToggleTaskCompletion(task._id, task.IsCompleted)}
                />{" "}
                Mark as Done
            </label>
        </div>
    );
};

export default TaskCard;