import React, { useState, useEffect } from "react";
import "../index.css";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import TaskCalendar from "../pages/Dashboard"; // Corrected import

const TaskManagement = () => {
    const [tasks, setTasks] = useState([]);
    const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:3002/api/tasks", {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!response.ok) throw new Error("Failed to fetch tasks");
            const data = await response.json();
            setTasks(data.tasks || []);
        } catch (error) {
            console.error("Error fetching tasks:", error);
            setTasks([]);
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
            setIsTaskFormOpen(false);
            fetchTasks();
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    const handleEditTask = (task) => {
        setTaskToEdit(task);
        setIsTaskFormOpen(true);
    };

    const handleUpdateTask = async (updatedTask) => {
        try {
            const token = localStorage.getItem("token");
            await fetch(`http://localhost:3002/api/tasks/${updatedTask.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedTask),
            });
            setIsTaskFormOpen(false);
            setTaskToEdit(null);
            fetchTasks();
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            const token = localStorage.getItem("token");
            await fetch(`http://localhost:3002/api/tasks/${taskId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchTasks();
        } catch (error) {
            console.error("Error deleting task:", error);
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
            console.error("Error toggling task completion:", error);
        }
    };

    return (
        <div>
            <section id="task-tracking">
                <h2>📋 Task Tracking</h2>
                <button id="addTaskButton" className="modal-button" onClick={() => setIsTaskFormOpen(true)}>
                    Add New Task
                </button>

                <section className="tasks">
                    {tasks.length === 0 ? (
                        <p>No tasks available. Add one!</p>
                    ) : (
                        tasks.map((task) => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                handleToggleTaskCompletion={handleToggleTaskCompletion}
                                handleEditTask={handleEditTask}
                                handleDeleteTask={handleDeleteTask}
                            />
                        ))
                    )}
                </section>
            </section>

            {isTaskFormOpen && (
                <TaskForm
                    onSubmit={taskToEdit ? handleUpdateTask : handleAddTask}
                    onClose={() => {
                        setIsTaskFormOpen(false);
                        setTaskToEdit(null);
                    }}
                    task={taskToEdit}
                />
            )}

            <TaskCalendar tasks={tasks} />
        </div>
    );
};

export default TaskManagement;