import React, { useState, useEffect } from "react";
import "../index.css";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";

const TaskManagement = () => {
    const [tasks, setTasks] = useState([]);
    const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);

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
            console.log("Fetched tasks:", data); // Log the fetched data
            if (Array.isArray(data.tasks)) {
                setTasks(data.tasks); // Access the tasks array within the object
            } else {
                setTasks([]); // Ensure tasks is an array
            }
        } catch (error) {
            console.error("Error fetching tasks:", error);
            setTasks([]); // Ensure tasks is an array in case of error
        }
    };

    const handleAddTask = async (newTask) => {
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

            setIsTaskFormOpen(false); // Close the form
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
                <button id="addTaskButton" className="modal-button" onClick={() => setIsTaskFormOpen(true)}>
                    Add New Task
                </button>

                {/* Task List */}
                <section className="tasks">
                    {tasks.length === 0 ? (
                        <p>No tasks available. Add one!</p>
                    ) : (
                        tasks.map((task) => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                handleToggleTaskCompletion={handleToggleTaskCompletion}
                            />
                        ))
                    )}
                </section>
            </section>

            {isTaskFormOpen && (
                <TaskForm
                    onSubmit={handleAddTask}
                    onClose={() => setIsTaskFormOpen(false)}
                />
            )}
        </div>
    );
};

export default TaskManagement;