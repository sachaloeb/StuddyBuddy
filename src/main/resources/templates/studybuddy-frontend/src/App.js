import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import TaskManagement from './pages/TaskManagement';
// import StudyRecommendations from './pages/StudyRecommendations';
// import BreakReminders from './pages/BreakReminders';
import './index.css';

const App = () => {
    return (
        <div>
            <header>
                <h1>StudyBuddy</h1>
            </header>
            <nav id="navbar" className="navbar">
                <ul>
                    <li><Link to="/dashboard">Schedule Organizer</Link></li>
                    <li><Link to="/tasks">Task Tracking</Link></li>
                    {/*<li><Link to="/study-recommendations">Study Recommendations</Link></li>*/}
                    {/*<li><Link to="/break-reminders">Break Reminders</Link></li>*/}
                </ul>
            </nav>
            <main>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/tasks" element={<TaskManagement />} />
                    <Route path="/" element={<Dashboard />} />
                    {/*<Route path="/study-recommendations" element={<StudyRecommendations />} />*/}
                    {/*<Route path="/break-reminders" element={<BreakReminders />} />*/}
                </Routes>
            </main>
        </div>
    );
};

export default App;