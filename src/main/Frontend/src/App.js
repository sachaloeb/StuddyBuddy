import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Login from './pages/Login';
import Register from './pages/Register';
import BreakReminders from './pages/BreakReminders';
import './index.css';
import { isTokenExpired } from './utils/isTokenExpired';
import useAxiosInterceptors from './utils/useAxiosInterceptors';

const Dashboard = lazy(() => import("./pages/Dashboard"));
const TaskManagement = lazy(() => import("./pages/TaskManagement"));

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
                <Route path="/" element={
                    <Suspense fallback={<div>Loading Dashboard...</div>}>
                        <Dashboard />
                    </Suspense>} />
                <Route path="/dashboard" element={
                    <Suspense fallback={<div>Loading Dashboard...</div>}>
                        <Dashboard />
                    </Suspense>
                } />
                <Route path="/tasks" element={
                    <Suspense fallback={<div>Loading Task Management...</div>}>
                        <TaskManagement />
                    </Suspense>
                } />
                <Route path="/breakReminders" element={<BreakReminders />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </div>
    );
}

export default App;