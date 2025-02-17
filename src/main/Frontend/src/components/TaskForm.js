import React, { useState, useEffect } from "react";
import "../index.css";

const TaskForm = ({ onSubmit, onClose, task }) => {
    const [taskName, setTaskName] = useState("");
    const [taskStartDate, setTaskStartDate] = useState("");
    const [taskStartTime, setTaskStartTime] = useState("");
    const [taskEndDate, setTaskEndDate] = useState("");
    const [taskEndTime, setTaskEndTime] = useState("");
    const [taskType, setTaskType] = useState("Personal");
    const [taskPriority, setTaskPriority] = useState("Medium");

    useEffect(() => {
        if (task) {
            setTaskName(task.name);
            setTaskStartDate(task.startDate.split("T")[0]);
            setTaskStartTime(task.startDate.split("T")[1].substring(0, 5));
            setTaskEndDate(task.dueDate.split("T")[0]);
            setTaskEndTime(task.dueDate.split("T")[1].substring(0, 5));
            setTaskType(task.type);
            setTaskPriority(task.priority);
        }
    }, [task]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const startDateTime = new Date(`${taskStartDate}T${taskStartTime}`);
        const endDateTime = new Date(`${taskEndDate}T${taskEndTime}`);

        if (!taskName.trim()) {
            alert("⚠️ Task Name cannot be empty.");
            return;
        }
        if (isNaN(startDateTime.getTime()) || isNaN(endDateTime.getTime())) {
            alert("⚠️ Invalid date or time format. Please check all fields.");
            return;
        }
        if (endDateTime <= startDateTime) {
            alert("⚠️ End time must be later than start time.");
            return;
        }

        onSubmit({
            id: task ? task.id : undefined,
            name: taskName,
            startDate: startDateTime.toISOString(),
            dueDate: endDateTime.toISOString(),
            type: taskType,
            priority: taskPriority,
        });

        onClose();
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>{task ? "Edit Task" : "Add New Task"}</h2>
                <form id="taskForm" onSubmit={handleSubmit}>
                    <label htmlFor="taskName">Task Name:</label>
                    <input
                        type="text"
                        id="taskName"
                        name="taskName"
                        className="task-input"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                        required
                    />

                    <label htmlFor="startDate">Start Date:</label>
                    <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        className="task-input"
                        value={taskStartDate}
                        onChange={(e) => setTaskStartDate(e.target.value)}
                        required
                    />

                    <label htmlFor="startTime">Start Time:</label>
                    <input
                        type="time"
                        id="startTime"
                        name="startTime"
                        className="task-input"
                        value={taskStartTime}
                        onChange={(e) => setTaskStartTime(e.target.value)}
                    />

                    <label htmlFor="endDate">End Date:</label>
                    <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        className="task-input"
                        value={taskEndDate}
                        onChange={(e) => setTaskEndDate(e.target.value)}
                        required
                    />

                    <label htmlFor="endTime">End Time:</label>
                    <input
                        type="time"
                        id="endTime"
                        name="endTime"
                        className="task-input"
                        value={taskEndTime}
                        onChange={(e) => setTaskEndTime(e.target.value)}
                        required
                    />

                    <label htmlFor="taskType">Type:</label>
                    <select
                        id="taskType"
                        name="taskType"
                        className="task-select"
                        value={taskType}
                        onChange={(e) => setTaskType(e.target.value)}
                        required
                    >
                        <option value="Personal">Personal</option>
                        <option value="Class">Class</option>
                        <option value="Assignment">Assignment</option>
                        <option value="Exam">Exam</option>
                        <option value="Study Time">Study Time</option>
                        <option value="Professional">Professional</option>
                        <option value="Break">Break</option>
                    </select>

                    <label htmlFor="taskPriority">Priority:</label>
                    <select
                        id="taskPriority"
                        name="taskPriority"
                        className="task-select"
                        value={taskPriority}
                        onChange={(e) => setTaskPriority(e.target.value)}
                        required
                    >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>

                    <button type="submit" className="modal-button">{task ? "Update Task" : "Add Task"}</button>
                    <button type="button" className="modal-button" onClick={onClose}>Close</button>
                </form>
            </div>
        </div>
    );
};

export default TaskForm;