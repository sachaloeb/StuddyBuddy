import TaskCard from "../components/TaskCard";
import TaskModal from "../components/TaskModal";
import React, { useEffect, useState } from "react";
import "../index.css";

const TaskManagement = () => {
    const [tasks, setTasks] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch('http://localhost:3002/api/tasks', {
                headers: { "Authorization": `Bearer ${token}` }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch tasks');
            }

            const data = await response.json();
            if (Array.isArray(data.tasks)) {
                setTasks(data.tasks);
            } else {
                console.error('Fetched data does not contain tasks array:', data);
            }
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const openAddTaskModal = () => {
        setShowModal(true);
    };

    const handleSaveTask = async (task) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch('http://localhost:3002/api/tasks', {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(task),
            });

            if (!response.ok) {
                throw new Error('Failed to save task');
            }

            const savedTask = await response.json();
            console.log("Task saved:", savedTask);
            setTasks([...tasks, savedTask.task]); // Ensure the new task is added to the state
        } catch (error) {
            console.error('Error saving task:', error);
        }
        setShowModal(false);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleToggleTaskCompletion = async (taskId, isCompleted) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:3002/api/tasks/${taskId}`, {
                method: 'PUT',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ IsCompleted: !isCompleted }),
            });

            if (!response.ok) {
                throw new Error('Failed to update task');
            }

            const updatedTask = await response.json();
            setTasks(tasks.map(task => task._id === taskId ? updatedTask : task));
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const handleEditTask = (taskId) => {
        // Logic to handle editing a task
        console.log(`Edit task with ID: ${taskId}`);
    };

    const handleDeleteTask = async (taskId) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:3002/api/tasks/${taskId}`, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete task');
            }

            setTasks(tasks.filter(task => task._id !== taskId));
            console.log(`Deleted task with ID: ${taskId}`);
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
        <div>
            <section id="task-tracking">
                <h1>Task Management</h1>
                <button
                    id="addTaskButton"
                    className="modal-button"
                    onClick={openAddTaskModal}
                >
                    Add Task
                </button>

                {showModal && (
                    <TaskModal
                        isOpen={showModal}
                        onClose={handleCloseModal}
                        onConfirm={handleSaveTask}
                        message="Add Task"
                    />
                )}

                <section className="tasks" id="tasks">
                    <ul>
                        {tasks.map((task, index) => (
                            <TaskCard
                                key={index}
                                task={task}
                                handleToggleTaskCompletion={handleToggleTaskCompletion}
                                handleEditTask={handleEditTask}
                                handleDeleteTask={handleDeleteTask}
                            />
                        ))}
                    </ul>
                </section>
            </section>
        </div>
    );
};

export default TaskManagement;