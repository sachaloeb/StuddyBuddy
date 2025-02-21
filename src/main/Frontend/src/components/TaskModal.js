import React, { useState } from "react";
import "../index.css" // Ensure you create a corresponding CSS file for styling

const TaskModal = ({ isOpen, onClose, onConfirm, initialTask }) => {
    const [taskName, setTaskName] = useState(initialTask?.name || "");
    const [startDate, setStartDate] = useState(initialTask?.startDate || "");
    const [startTime, setStartTime] = useState(initialTask?.startTime || "");
    const [endDate, setEndDate] = useState(initialTask?.endDate || "");
    const [endTime, setEndTime] = useState(initialTask?.endTime || "");
    const [taskType, setTaskType] = useState(initialTask?.type || "Personal");
    const [priority, setPriority] = useState(initialTask?.priority || "Medium");

    const handleSubmit = (e) => {
        e.preventDefault();
        const startDateTime = new Date(`${startDate}T${startTime}`);
        const endDateTime = new Date(`${endDate}T${endTime}`);
        const task = {
            name: taskName,
            startDate: startDateTime.toISOString(),
            dueDate: endDateTime.toISOString(),
            type: taskType,
            priority: priority,
        };
        onConfirm(task);
    };

    if (!isOpen) return null;

    return (
        <div id="customPrompt" className="modal">
            <div className="modal-content">
                <span id="closePrompt" className="close">&times;</span>
                <h2>{initialTask ? "Edit Task" : "Add Task"}</h2>
                <form onSubmit={handleSubmit}>
                    <label>Task Name:</label>
                    <input type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} required />

                    <label>Start Date:</label>
                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />

                    <label>Start Time:</label>
                    <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />

                    <label>End Date:</label>
                    <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />

                    <label>End Time:</label>
                    <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />

                    <label>Type:</label>
                    <select value={taskType} onChange={(e) => setTaskType(e.target.value)}>
                        <option value="Personal">Personal</option>
                        <option value="Class">Class</option>
                        <option value="Assignment">Assignment</option>
                        <option value="Exam">Exam</option>
                        <option value="Study Time">Study Time</option>
                        <option value="Professional">Professional</option>
                        <option value="Break">Break</option>
                    </select>

                    <label>Priority:</label>
                    <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>

                    <button type="submit">{initialTask ? "Update Task" : "Add Task"}</button>
                </form>
            </div>
        </div>
    );
};

export default TaskModal;
