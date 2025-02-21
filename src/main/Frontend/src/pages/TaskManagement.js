import React, { useState, useEffect } from "react";
import TaskCard from "../components/TaskCard";
import TaskModal from "../components/TaskModal"; // Import TaskModal
import "../index.css";

const TaskManagementPage = () => {
    const [tasks, setTasks] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchTasks();
    }, []);

    async function fetchTasks() {
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
    }

    async function handleAddTask(newTask) {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch('http://localhost:3002/api/tasks', {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newTask),
            });

            if (!response.ok) {
                throw new Error('Failed to save task');
            }

            const savedTask = await response.json();
            setTasks([...tasks, savedTask]);
        } catch (error) {
            console.error('Error saving task:', error);
        }
        setShowModal(false);
    }

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            <section id="task-tracking">
                <h1>Task Management</h1>
                <button
                    id="addTaskButton"
                    className="modal-button"
                    onClick={handleOpenModal}
                >
                    Add Task
                </button>

                {/* Render TaskModal when showModal is true */}
                {showModal && (
                    <TaskModal
                        isOpen={showModal}
                        onClose={handleCloseModal}
                        onConfirm={handleAddTask}
                    />
                )}

                <section className="tasks" id="tasks">
                    <ul>
                        {tasks.map((task, index) => (
                            <TaskCard key={index} task={task} />
                        ))}
                    </ul>
                </section>
            </section>
        </div>
    );
};

export default TaskManagementPage;