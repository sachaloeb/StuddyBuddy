import TaskCard from "../components/TaskCard";
// import TaskModal from "../components/TaskModal";
import React, { useEffect, useState,lazy,Suspense } from "react";
import "../index.css";
import api from "../utils/api";

const TaskModal = lazy(() => import("../components/TaskModal"));

const TaskManagement = () => {
    const [tasks, setTasks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {

            const data = await api.fetchTasks();
            if (Array.isArray(data)) {
                setTasks(data);
            } else {
                console.error('Fetched data does not contain tasks array:', data);
            }
        } catch (error) {
            console.error('Error fetching tasks:', error);
            alert('Failed to load tasks. Please try again.');
        }
    };

    const openAddTaskModal = () => {
        setTaskToEdit(null); // Ensure it's a new task
        setShowModal(true);
    };

    const handleSaveTask = async (task) => {
        try {
            const token = localStorage.getItem("token");
            console.log("Saving task with data:", task); // Log the task data
            const response = await fetch("http://localhost:3002/api/tasks", {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(task),
            });

            if (!response.ok) {
                throw new Error("Failed to save task");
            }

            const result = await response.json();
            console.log("Task saved successfully:", result);
            setTasks([...tasks, result.task]);
        } catch (error) {
            console.error("Error saving task:", error);
        }
        setShowModal(false);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleToggleTaskCompletion = async (taskId, isCompleted) => {
        try {
            const updatedTask = await api.completeTask(taskId, isCompleted);
            setTasks(tasks.map(task => task._id === taskId ? updatedTask : task));
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const SaveEditedTask = async (task) => {
        try {
            const updatedTask = await api.editTask(task);
            setTasks(tasks.map(t => t._id === task._id ? updatedTask : t));
            console.log(`Updated task with ID: ${task._id}`);
        } catch (error) {
            console.error('Error updating task:', error);
            alert('Failed to update task. Please try again.');
        }
        setShowModal(false);
    };

    const handleEditTask = (taskId) => {
        // Find the task to edit
        const task = tasks.find(t => t._id === taskId);
        if (!task) return;

        setTaskToEdit(task);
        setShowModal(true);
    };

    const handleDeleteTask = async (taskId) => {
        try {
            await api.deleteTask(taskId);
            setTasks(tasks.filter(task => task._id !== taskId));
            console.log(`Deleted task with ID: ${taskId}`);
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
        <div>
            <section id="task-tracking">
                <h2>Task Management</h2>
                <button
                    id="addTaskButton"
                    className="modal-button"
                    onClick={openAddTaskModal}
                >
                    Add Task
                </button>

                {showModal && (
                    <Suspense fallback={<div>Loading...</div>}>
                        <TaskModal
                            isOpen={showModal}
                            onClose={handleCloseModal}
                            onConfirm={taskToEdit ? SaveEditedTask : handleSaveTask}
                            message={taskToEdit ? "Edit Task" : "Add Task"}
                            initialTask={taskToEdit} // Pass task data for editing
                        />
                    </Suspense>
                )}

                <section className="tasks" id="tasks">
                    <ul>
                        {tasks.map((task) => (
                            <TaskCard
                                key={task._id}
                                task={task}
                                handleToggleTaskCompletion={() => handleToggleTaskCompletion(task._id, task.IsCompleted)}
                                handleEditTask={() => handleEditTask(task._id)} // Fixed incorrect invocation
                                handleDeleteTask={() => handleDeleteTask(task._id)}
                            />
                        ))}
                    </ul>
                </section>
            </section>
        </div>
    );
};

export default TaskManagement;