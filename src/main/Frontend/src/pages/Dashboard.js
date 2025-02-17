import React, { useEffect, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import BreakReminder from '../components/BreakReminders';
import '../index.css';

const Dashboard = () => {
    const calendarRef = useRef(null);
    const [events, setEvents] = useState([]);

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
            const events = data.tasks.map(task => ({
                title: task.name,
                start: task.startDate,
                end: task.dueDate,
                id: task.id,
            }));
            setEvents(events);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    useEffect(() => {
        const calendarApi = calendarRef.current.getApi();
        calendarApi.render();
    }, [events]);

    return (
        <div>
            <section id="schedule">
                <h2>Schedule</h2>
                <div id="calendar">
                    <FullCalendar
                        ref={calendarRef}
                        plugins={[dayGridPlugin, timeGridPlugin, bootstrapPlugin]}
                        initialView="timeGridWeek"
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay'
                        }}
                        customButtons={{
                            prev: {
                                text: 'Prev',
                                click: function() {
                                    calendarRef.current.getApi().prev();
                                }
                            },
                            next: {
                                text: 'Next',
                                click: function() {
                                    calendarRef.current.getApi().next();
                                }
                            }
                        }}
                        themeSystem="bootstrap"
                        events={events}
                    />
                </div>
            </section>
            <BreakReminder />
        </div>
    );
};

export default Dashboard;