import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Dashboard from './pages/Dashboard';
import TaskManagement from './pages/TaskManagement';
import Login from './pages/Login';
import Register from './pages/Register';
import BreakReminders from './pages/BreakReminders';
import './index.css';
import { isTokenExpired } from './utils/isTokenExpired';
import useAxiosInterceptors from './utils/useAxiosInterceptors';

function App() {
    const navigate = useNavigate();
    useAxiosInterceptors();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token || isTokenExpired(token)) {
            navigate('/login');
        }
    }, [navigate]);

    return (
        <div>
            <NavigationBar />
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/tasks" element={<TaskManagement />} />
                <Route path="/breakReminders" element={<BreakReminders />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </div>
    );
}

export default App;