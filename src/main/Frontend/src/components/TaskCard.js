import React from "react";

const TaskCard = ({ task, handleToggleTaskCompletion, handleEditTask, handleDeleteTask }) => {
    return (
        <div className={`task-card ${task.IsCompleted ? "completed" : ""}`} key={task.id}>
            <h3>{task.name}</h3>
            <p>Due: {new Date(task.dueDate).toLocaleString()}</p>
            <label>
                <input
                    name="taskCheckBox"
                    type="checkbox"
                    checked={task.IsCompleted}
                    onChange={() => handleToggleTaskCompletion(task._id, task.IsCompleted)}
                />{" "}
                Done
            </label>
            <div className="task-buttons">
            <button className="edit-task-button" onClick={() => handleEditTask(task._id)}>Edit</button>
            <button className="delete-task-button" onClick={() => handleDeleteTask(task._id)}>Delete</button>
            </div>
        </div>
    );
};

export default TaskCard;