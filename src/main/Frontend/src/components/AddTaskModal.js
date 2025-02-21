import React, { useState } from "react";
import CustomPrompt from "./CustomPrompt";
import handleAddTask from "../pages/TaskManagement"; // Import handleAddTask

const AddTaskModal = ({ calendar, onClose }) => {
    const [taskName, setTaskName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endDate, setEndDate] = useState("");
    const [endTime, setEndTime] = useState("");
    const [taskType, setTaskType] = useState("Personal");
    const [taskPriority, setTaskPriority] = useState("Medium");

    const validateTaskInputs = (taskName, startDateTime, endDateTime) => {
        if (!taskName || !startDateTime || !endDateTime) {
            alert("All fields must be filled!");
            return false;
        }

        if (startDateTime >= endDateTime) {
            alert("End date must be after start date!");
            return false;
        }

        return true;
    };

    const handleSubmit = async () => {
        const startDateTime = new Date(`${startDate}T${startTime}`);
        const endDateTime = new Date(`${endDate}T${endTime}`);

        if (!validateTaskInputs(taskName, startDateTime, endDateTime)) {
            return;
        }

        const task = {
            name: taskName,
            startDate: startDateTime.toISOString(),
            dueDate: endDateTime.toISOString(),
            type: taskType,
            priority: taskPriority,
        };

        await handleAddTask(task);
        onClose(); // Close the modal after saving
    };

    return (
        <CustomPrompt
            message="Add Task"
            isForm={true}
            onClose={(data) => (data ? handleSubmit() : onClose())}
        >
            <form id="addTaskForm">
                <label htmlFor="taskName">Task Name:</label>
                <input type="text" id="taskName" value={taskName} onChange={(e) => setTaskName(e.target.value)} required />

                <label htmlFor="startDate">Start Date (YYYY-MM-DD):</label>
                <input type="date" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />

                <label htmlFor="startTime">Start Time (HH:MM):</label>
                <input type="time" id="startTime" value={startTime} onChange={(e) => setStartTime(e.target.value)} />

                <label htmlFor="endDate">End Date (YYYY-MM-DD):</label>
                <input type="date" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />

                <label htmlFor="endTime">End Time (HH:MM):</label>
                <input type="time" id="endTime" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />

                <label htmlFor="taskType">Type:</label>
                <select id="taskType" value={taskType} onChange={(e) => setTaskType(e.target.value)} required>
                    <option value="Personal">Personal</option>
                    <option value="Class">Class</option>
                    <option value="Assignment">Assignment</option>
                    <option value="Exam">Exam</option>
                    <option value="Study Time">Study Time</option>
                    <option value="Professional">Professional</option>
                    <option value="Break">Break</option>
                </select>

                <label htmlFor="taskPriority">Priority:</label>
                <select id="taskPriority" value={taskPriority} onChange={(e) => setTaskPriority(e.target.value)} required>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
            </form>
        </CustomPrompt>
    );
};

export default AddTaskModal;