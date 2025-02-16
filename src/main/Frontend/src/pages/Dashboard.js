import React, { useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import BreakReminder from '../components/BreakReminders';
import '../index.css';

const Dashboard = () => {
    const calendarRef = useRef(null);

    useEffect(() => {
        const calendarApi = calendarRef.current.getApi();
        calendarApi.render();
    }, []);

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
                />
                </div>
            </section>
            <BreakReminder />
        </div>
    );
};

export default Dashboard;