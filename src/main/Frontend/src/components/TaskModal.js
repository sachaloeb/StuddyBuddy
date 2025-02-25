import React, { useState, useEffect } from "react";
import "../index.css";
import moment from 'moment';

const TaskModal = ({ isOpen, onClose, onConfirm, initialTask=null, message }) => {
    const [taskID, setTaskID] = useState("");
    const [taskName, setTaskName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endDate, setEndDate] = useState("");
    const [endTime, setEndTime] = useState("");
    const [taskType, setTaskType] = useState("Personal");
    const [priority, setPriority] = useState("Medium");

    useEffect(() => {
        if (initialTask) {
            setTaskID(initialTask._id);
            setTaskName(initialTask.name);
            setStartDate(moment(initialTask.startDate).format("YYYY-MM-DD"));
            setStartTime(moment(initialTask.startDate).format("HH:mm"));
            setEndDate(moment(initialTask.dueDate).format("YYYY-MM-DD"));
            setEndTime(moment(initialTask.dueDate).format("HH:mm"));
            setTaskType(initialTask.type);
            setPriority(initialTask.priority);
        }
    }, [initialTask]);

    const validateTaskInputs = (taskName, startDateTime, endDateTime) => {
        if (!taskName || !startDateTime || !endDateTime) {
            alert("⚠️ All fields must be filled!");
            return false;
        }

        if (startDateTime >= endDateTime) {
            alert("⚠️ End date must be after start date!");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const startDateTime = moment(`${startDate}T${startTime}`);
        const endDateTime = moment(`${endDate}T${endTime}`);

        if (!validateTaskInputs(taskName, startDateTime, endDateTime)) {
            return;
        }

        const task = {
            _id: taskID,
            name: taskName,
            startDate: startDateTime.toISOString(),
            dueDate: endDateTime.toISOString(),
            type: taskType,
            priority,
            IsCompleted: initialTask?.IsCompleted || false
        };

        await onConfirm(task);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div id="customPrompt" className="modal" style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay effect
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            zIndex: 9999
        }}>
            <div className="modal-content" style={{
                padding: "20px",
                backgroundColor: "#fff",
                borderRadius: "8px",
                maxWidth: "500px",
                width: "90%",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
            }}>
                <span className="close" onClick={onClose} style={{
                    float: "right",
                    fontSize: "24px",
                    cursor: "pointer"
                }}>&times;</span>

                <h2 style={{ textAlign: "center", marginBottom: "15px" }}>{message}</h2>

                <form onSubmit={handleSubmit}>
                    <label htmlFor="taskName">Task Name:</label>
                    <input type="text" id="taskName" value={taskName} onChange={(e) => setTaskName(e.target.value)} required />

                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div style={{ width: "48%" }}>
                            <label>Start Date:</label>
                            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
                        </div>
                        <div style={{ width: "48%" }}>
                            <label>Start Time:</label>
                            <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                        </div>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div style={{ width: "48%" }}>
                            <label>End Date:</label>
                            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
                        </div>
                        <div style={{ width: "48%" }}>
                            <label>End Time:</label>
                            <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
                        </div>
                    </div>

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
                    <select id="taskPriority" value={priority} onChange={(e) => setPriority(e.target.value)} required>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>

                    <div style={{
                        marginTop: "10px",
                        display: "flex",
                        justifyContent: "space-between"
                    }}>
                        <button type="submit" id="promptOk" className="ok-button">OK</button>
                        <button type="button" id="promptCancel" className="cancel-button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskModal;
