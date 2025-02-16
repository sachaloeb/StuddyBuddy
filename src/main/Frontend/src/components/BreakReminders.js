import React, { useState, useEffect } from "react";

const BreakReminder = () => {
    const [reminders, setReminders] = useState([]);
    const [showReminder, setShowReminder] = useState(false);
    const [currentReminder, setCurrentReminder] = useState("");

    useEffect(() => {
        fetchBreakReminders();
    }, []);

    // 🔥 Fetch break reminders from backend
    const fetchBreakReminders = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:3002/api/break-reminders", {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) throw new Error("Failed to fetch reminders");

            const data = await response.json();
            setReminders(data.reminders || []);
        } catch (error) {
            console.error("Error fetching break reminders:", error);
        }
    };

    // 🔥 Show pop-up reminders every 6 seconds for testing
    useEffect(() => {
        const interval = setInterval(() => {
            if (reminders.length > 0) {
                const randomReminder = reminders[Math.floor(Math.random() * reminders.length)];
                setCurrentReminder(randomReminder.message);
                setShowReminder(true);

                // Hide the notification after 5 seconds
                setTimeout(() => setShowReminder(false), 5000);
            }
        }, 6000); // 🔥 Every 6 seconds (for testing)

        return () => clearInterval(interval);
    }, [reminders]);

    return (
        <>
                <div className="break-reminder-popup">
                    <p>{currentReminder}</p>
                    <button onClick={() => setShowReminder(false)}>Dismiss</button>
                </div>
        </>
    );
};

export default BreakReminder;
