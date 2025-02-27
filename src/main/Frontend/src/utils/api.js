// src/utils/api.js

const API_BASE_URL = 'http://localhost:3002'; // Replace with your actual API base URL

const api = {
    // Function to get tasks
    fetchTasks: async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${API_BASE_URL}/api/tasks`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!response.ok) throw new Error("Failed to fetch tasks");
            const data = await response.json();
            return data.tasks;
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    },

    // Function to login
    login: async (credentials) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });
            if (!response.ok) throw new Error('Failed to login');
            return await response.json();
        } catch (error) {
            console.error('Error logging in:', error);
            throw error;
        }
    },

    // Function to logout
    logout: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
                method: 'POST',
            });
            if (!response.ok) throw new Error('Failed to logout');
            return await response.json();
        } catch (error) {
            console.error('Error logging out:', error);
            throw error;
        }
    },

    // Function to add a new task
    addTask: async (task) => {
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
            return await response.json();
        } catch (error) {
            console.error('Error adding task:', error);
        }
    },

    register: async (user) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
            if (!response.ok) throw new Error('Failed to register');
            return await response.json();
        } catch (error) {
            console.error('Error registering:', error);
            throw error;
        }
    },

    editTask: async (task) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_BASE_URL}/api/tasks/${task._id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(task),
            });
            if (!response.ok) throw new Error('Failed to update task');
            return await response.json();
        } catch (error) {
            console.error('Error updating task:', error);
            throw error;
        }
    },

    completeTask: async (taskId, isCompleted) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_BASE_URL}/api/tasks/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ IsCompleted: !isCompleted }),
            });
            if (!response.ok) throw new Error('Failed to update task');
            console.log('Task completed:', taskId);
            return await response.json();
        } catch (error) {
            console.error('Error updating task:', error);
            throw error;
        }
    },

    deleteTask: async (taskId) => {
        try {
            const token = localStorage.getItem('token');
            console.log(`Attempting to delete task with ID: ${taskId}`); // Log the task ID
            const response = await fetch(`${API_BASE_URL}/api/tasks/${taskId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                if (response.status === 404) {
                    console.error(`Task with ID ${taskId} not found`);
                }
                throw new Error('Failed to delete task');
            }
            console.log('Task deleted:', taskId);
            return await response.json();
        } catch (error) {
            console.error('Error deleting task:', error);
            throw error;
        }
    }
};

export default api;