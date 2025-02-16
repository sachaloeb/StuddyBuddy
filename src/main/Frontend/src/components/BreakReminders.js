import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BreakReminders = () => {
    const [reminders, setReminders] = useState([]);

    useEffect(() => {
        // Fetch break reminders from the backend API
        const fetchReminders = async () => {
            try {
                const token = localStorage.getItem("token"); // Get the token from local storage
                const response = await axios.get('http://localhost:3002/api/break-reminders', {
                    headers: { Authorization: `Bearer ${token}` } // Include the token in the request headers
                });
                setReminders(response.data);
            } catch (error) {
                console.error('Error fetching break reminders:', error);
            }
        };

        fetchReminders();
    }, []);

    useEffect(() => {
        // Display pop-up reminders at fixed intervals
        const interval = setInterval(() => {
            if (reminders.length > 0) {
                const reminder = reminders[Math.floor(Math.random() * reminders.length)];
                alert(`Break Reminder: ${reminder.message}`);
            }
        }, 3600000); // 1 hour interval

        return () => clearInterval(interval);
    }, [reminders]);

    return (
        <div>
            <h2>Break Reminders</h2>
            <ul>
                {reminders.map((reminder, index) => (
                    <li key={index}>{reminder.message}</li>
                ))}
            </ul>
        </div>
    );
};

export default BreakReminders;