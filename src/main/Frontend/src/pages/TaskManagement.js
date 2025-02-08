import React, { useState, useEffect } from "react";
import "../index.css";
import TaskCard from "../components/TaskCard";

const TaskManagement = () => {
    const [taskName, setTaskName] = useState("");
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchTasks(); // Fetch tasks when component loads
    }, []);

    const fetchTasks = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:3002/api/tasks", {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!response.ok) throw new Error("Failed to fetch tasks");
            const data = await response.json();
            setTasks(data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    const handleAddTask = async (e) => {
        e.preventDefault();
        if (!taskName.trim()) return;

        const newTask = { name: taskName };
        try {
            const token = localStorage.getItem("token");
            await fetch("http://localhost:3002/api/tasks", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newTask),
            });

            setTaskName(""); // Clear input field
            fetchTasks(); // Refresh the task list
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    const handleToggleTaskCompletion = async (taskId, isCompleted) => {
        try {
            const token = localStorage.getItem("token");
            await fetch(`http://localhost:3002/api/tasks/${taskId}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ IsCompleted: !isCompleted }),
            });

            fetchTasks();
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    return (
        <div>
            <section id="task-tracking">
            <h2>📋 Task Tracking</h2>
            <button id="addTaskButton" className="modal-button" onClick={() => alert("Open Task Modal!")}>
                Add New Task
            </button>

            {/* Task List */}
                <section className="tasks">
                    {tasks.length === 0 ? (
                        <p>No tasks available. Add one!</p>
                    ) : (
                        tasks.map((task) => (
                            <TaskCard
                                task={task}
                                handleToggleTaskCompletion={handleToggleTaskCompletion}
                            />
                        ))
                    )}
                </section>
            </section>
        </div>
    );
};

export default TaskManagement;
