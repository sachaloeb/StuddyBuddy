import React, { useState } from "react";
import CustomPrompt from "./CustomPrompt";
import "../index.css";

const TaskForm = ({ task = {}, onSave, mode = "add" }) => {
    const [showPrompt, setShowPrompt] = useState(false);
    const [formContent, setFormContent] = useState("");

    const handleShowForm = () => {
        const formContent = `
        <form id="addTaskForm">
            <label for="taskName">Task Name:</label>
            <input type="text" id="taskName" name="taskName" required>
            <label for="startDate">Start Date (YYYY-MM-DD):</label>
            <input type="date" id="startDate" name="startDate" required>
            <label for="startTime">Start Time (HH:MM):</label>
            <input type="time" id="startTime" name="startTime">
            <label for="endDate">End Date (YYYY-MM-DD):</label>
            <input type="date" id="endDate" name="endDate" required>
            <label for="endTime">End Time (HH:MM):</label>
            <input type="time" id="endTime" name="endTime" required>
            <label for="taskType">Type:</label>
            <select id="taskType" name="taskType" required>
                <option value="Personal">Personal</option>
                <option value="Class">Class</option>
                <option value="Assignment">Assignment</option>
                <option value="Exam">Exam</option>
                <option value="Study Time">Study Time</option>
                <option value="Professional">Professional</option>
                <option value="Break">Break</option>
            </select>
            <label for="taskPriority">Priority:</label>
            <select id="taskPriority" name="taskPriority" required>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
            </select>
        </form>
    `;

        setFormContent(formContent);
        setShowPrompt(true);
    };

    const handleConfirm = (formData) => {
        if (formData) {
            const updatedTask = {
                name: formData.get("taskName"),
                startDate: new Date(`${formData.get("startDate")}T${formData.get("startTime")}`).toISOString(),
                dueDate: new Date(`${formData.get("endDate")}T${formData.get("endTime")}`).toISOString(),
                type: formData.get("taskType"),
                priority: formData.get("taskPriority"),
            };
            onSave(updatedTask);
        }
        setShowPrompt(false);
    };

    const handleCancel = () => {
        setShowPrompt(false);
    };

    return (
        <div>
            {showPrompt && (
                <CustomPrompt
                    message={mode === "add" ? "Add Task" : "Edit Task"}
                    isForm={true}
                    formContent={formContent}
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                />
            )}
        </div>
    );
};

export default TaskForm;