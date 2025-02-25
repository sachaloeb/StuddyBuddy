import React, { useEffect, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import api from '../utils/api';
import '../index.css';

const Dashboard = () => {
    const calendarRef = useRef(null);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try{
            let events = await api.fetchTasks();
            events = events.map((task) => ({
                id: task._id,
                title: task.name,
                start: task.startDate,
                end: task.dueDate,
                extendedProps: {
                    priority: task.priority,
                    type: task.type,
                    isCompleted: task.isCompleted
                }
            }));
            setEvents(events);
        }catch(error){
            console.error('Error fetching tasks:', error);
            alert('Failed to load tasks. Please try again.');
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
        </div>
    );
};

export default Dashboard;