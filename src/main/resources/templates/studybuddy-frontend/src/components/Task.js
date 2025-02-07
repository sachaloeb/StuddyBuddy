// src/pages/Task.js
import React from 'react';

const Task = ({ task, onToggleCompletion, onDelete, onEdit }) => {
    return (
        <div className="task-card">
            <h3>{task.name}</h3>
            <p>Start: {new Date(task.startDate).toLocaleString()}</p>
            <p>End: {new Date(task.dueDate).toLocaleString()}</p>
            <p>Priority: {task.priority}</p>
            <label>
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => onToggleCompletion(task.id)}
                /> Done
            </label>
            <div className="task-buttons">
                <button onClick={() => onEdit(task)}>Edit</button>
                <button onClick={() => onDelete(task.id)}>Delete</button>
            </div>
        </div>
    );
};

export default Task;