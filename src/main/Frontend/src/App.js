import React from "react";
import { Routes, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import Dashboard from "./pages/Dashboard";
import TaskManagement from "./pages/TaskManagement";
import Login from "./pages/Login";
import Register from "./pages/Register";
// import StudyRecommendations from './pages/StudyRecommendations';
import BreakReminders from './pages/BreakReminders';
import './index.css';


function App() {
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