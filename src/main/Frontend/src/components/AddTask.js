// src/components/AddTask.js
import React, { useState, useEffect } from "react";
import TaskCard from "../components/TaskCard"; // Import TaskCard component
import { addTask } from '../services/api';

const AddTask = ({ onAdd }) => {
    const [taskName, setTaskName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endDate, setEndDate] = useState('');
    const [endTime, setEndTime] = useState('');
    const [taskType, setTaskType] = useState('Personal');
    const [taskPriority, setTaskPriority] = useState('Medium');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const startDateTime = new Date(`${startDate}T${startTime}`);
        const endDateTime = new Date(`${endDate}T${endTime}`);
        const newTask = {
            name: taskName,
            startDate: startDateTime.toISOString(),
            dueDate: endDateTime.toISOString(),
            type: taskType,
            priority: taskPriority,
            completed: false
        };
        const response = await addTask(newTask);
        onAdd(response.data);
        setTaskName('');
        setStartDate('');
        setStartTime('');
        setEndDate('');
        setEndTime('');
        setTaskType('Personal')
        setTaskPriority('Medium');
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="taskName">Task Name:</label>
            <input
                type="text"
                id="taskName"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                required
            />
            <label htmlFor="startDate">Start Date:</label>
            <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
            />
            <label htmlFor="startTime">Start Time:</label>
            <input
                type="time"
                id="startTime"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
            />
            <label htmlFor="endDate">End Date:</label>
            <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
            />
            <label htmlFor="endTime">End Time:</label>
            <input
                type="time"
                id="endTime"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
            />
            <label htmlFor="taskType">Type:</label>
            <select
                id="taskType"
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
                value={taskPriority}
                onChange={(e) => setTaskPriority(e.target.value)}
                required
            >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
            </select>
            <button type="submit">Add Task</button>
        </form>
    );
};

export default AddTask;