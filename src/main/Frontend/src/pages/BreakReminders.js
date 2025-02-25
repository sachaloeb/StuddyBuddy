import React, { useState, useEffect } from 'react';
import moment from 'moment';
import '../index.css';

const BreakReminders = () => {
    const [reminders, setReminders] = useState([]);
    const [reminderTime, setReminderTime] = useState('');
    const [customReminderTime, setCustomReminderTime] = useState(5); // Default reminder time in minutes

    useEffect(() => {
        fetchReminders();
    }, []);

    const fetchReminders = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3002/api/break-reminders', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (Array.isArray(data)) {
                setReminders(data);
            } else {
                setReminders([]);
            }
        } catch (error) {
            console.error('Error fetching reminders:', error);
            setReminders([]);
        }
    };

    const handleDeleteReminder = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await fetch(`http://localhost:3002/api/break-reminders/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            setReminders(reminders.filter(reminder => reminder._id !== id));
        } catch (error) {
            console.error('Error deleting reminder:', error);
        }
    };

    const handleAddReminder = async (e) => {
        e.preventDefault();
        if (reminderTime) {
            const today = moment().format('YYYY-MM-DD');
            const newReminder = {
                message: '⏳ Time for a break! Stay refreshed and productive.',
                time: moment(`${today} ${reminderTime}`, 'YYYY-MM-DD HH:mm').toISOString() // Combine date and time
            };
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:3002/api/break-reminders', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newReminder),
                });
                const savedReminder = await response.json();
                setReminders([...reminders, savedReminder]);
                setReminderTime('');
            } catch (error) {
                console.error('Error adding reminder:', error);
            }
        }
    };

    return (
        <div className="break-reminders">
            <h2>Break Reminders</h2>
            <form onSubmit={handleAddReminder}>
                <label htmlFor="reminderTime">Set Break Time:</label>
                <input
                    type="time"
                    id="reminderTime"
                    value={reminderTime}
                    onChange={(e) => setReminderTime(e.target.value)}
                    required
                />
                <label htmlFor="customReminderTime">Reminder Time (minutes before):</label>
                <input
                    type="number"
                    id="customReminderTime"
                    value={customReminderTime}
                    onChange={(e) => setCustomReminderTime(e.target.value)}
                    required
                />
                <button type="submit">Add Reminder</button>
            </form>
            <ul>
                {reminders.map((reminder, index) => (
                    <li key={index}>
                        {moment(reminder.time).format('h:mm A')}
                        <button onClick={() => handleDeleteReminder(reminder._id)} className="delete-button" style={{ marginLeft: '1rem', width: '30px', height: '30px', padding: '2px' }}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                            >
                                <path d="M3 6h18v2H3V6zm2 3h14v12H5V9zm3 2v8h2v-8H8zm4 0v8h2v-8h-2zm4 0v8h2v-8h-2z" />
                            </svg>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BreakReminders;