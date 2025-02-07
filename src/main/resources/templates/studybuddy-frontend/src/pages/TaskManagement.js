// src/pages/TaskManagement.js
import React, { useState, useEffect } from 'react';
import AddTask from '../components/AddTask';
import Task from '../components/Task';
import '../index.css';

const TaskManagement = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        // Fetch tasks from the backend
        const fetchTasks = async () => {
            try {
                const response = await fetch('http://localhost:3002/api/tasks', {
                    headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
                });
                if (!response.ok) throw new Error('Failed to fetch tasks');
                const data = await response.json();
                setTasks(data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };
        fetchTasks();
    }, []);

    const addTask = async (task) => {
        try {
            const response = await fetch('http://localhost:3002/api/tasks', {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(task),
            });
            if (!response.ok) throw new Error('Failed to save task');
            const savedTask = await response.json();
            setTasks([...tasks, savedTask]);
        } catch (error) {
            console.error('Error saving task:', error);
        }
    };

    const toggleTaskCompletion = async (taskId) => {
        const updatedTasks = tasks.map(task => {
            if (task.id === taskId) {
                task.completed = !task.completed;
            }
            return task;
        });
        setTasks(updatedTasks);
        // Update task completion status in the backend
        try {
            await fetch(`http://localhost:3002/api/tasks/${taskId}`, {
                method: 'PUT',
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ completed: updatedTasks.find(task => task.id === taskId).completed }),
            });
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const deleteTask = async (taskId) => {
        try {
            await fetch(`http://localhost:3002/api/tasks/${taskId}`, {
                method: 'DELETE',
                headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
            });
            setTasks(tasks.filter(task => task.id !== taskId));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const editTask = (task) => {
        // Implement edit task functionality
    };

    return (
        <div>
            <section id="task-tracking">
                <h2>Task Tracking</h2>
                <AddTask onAdd={addTask} />
                <section className="tasks" id="tasks">
                    {tasks.map(task => (
                        <Task
                            key={task.id}
                            task={task}
                            onToggleCompletion={toggleTaskCompletion}
                            onDelete={deleteTask}
                            onEdit={editTask}
                        />
                    ))}
                </section>
            </section>
        </div>
    );
};

export default TaskManagement;