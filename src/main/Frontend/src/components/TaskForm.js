import React, { useState } from "react";

const TaskForm = ({ onSubmit, onClose }) => {
    const [taskName, setTaskName] = useState("");
    const [taskStartDate, setTaskStartDate] = useState("");
    const [taskStartTime, setTaskStartTime] = useState("");
    const [taskEndDate, setTaskEndDate] = useState("");
    const [taskEndTime, setTaskEndTime] = useState("");
    const [taskType, setTaskType] = useState("Personal");
    const [taskPriority, setTaskPriority] = useState("Medium");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            name: taskName,
            startDate: `${taskStartDate}T${taskStartTime}`,
            dueDate: `${taskEndDate}T${taskEndTime}`,
            type: taskType,
            priority: taskPriority,
        });
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Add New Task</h2>
                <form id="addTaskForm">
                    <label htmlFor="taskName">Task Name:</label>
                    <input type="text" id="taskName" name="taskName" required/>
                    <label htmlFor="startDate">Start Date (YYYY-MM-DD):</label>
                    <input type="date" id="startDate" name="startDate" required/>
                    <label htmlFor="startTime">Start Time (HH:MM):</label>
                    <input type="time" id="startTime" name="startTime"/>
                    <label htmlFor="endDate">End Date (YYYY-MM-DD):</label>
                    <input type="date" id="endDate" name="endDate" required/>
                    <label htmlFor="endTime">End Time (HH:MM):</label>
                    <input type="time" id="endTime" name="endTime" required/>
                    <label htmlFor="taskType">Type:</label>
                    <select id="taskType" name="taskType" required>
                        <option value="Personal">Personal</option>
                        <option value="Class">Class</option>
                        <option value="Assignment">Assignment</option>
                        <option value="Exam">Exam</option>
                        <option value="Study Time">Study Time</option>
                        <option value="Professional">Professional</option>
                        <option value="Break">Break</option>
                    </select>
                    <label htmlFor="taskPriority">Priority:</label>
                    <select id="taskPriority" name="taskPriority" required>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                </form>
                <button className="modal-button" onClick={handleSubmit}>Add Task</button>
            </div>
        </div>
    );
}

export default TaskForm;