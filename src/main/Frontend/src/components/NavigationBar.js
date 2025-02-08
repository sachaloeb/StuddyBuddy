// src/components/NavigationBar.js
import React from "react";
import { Link } from "react-router-dom";

const NavigationBar = () => {
    return (
        <div>
            <header>
                <h1>StudyBuddy</h1>
            </header>
            <nav className="navbar">
                <ul>
                    <li><Link to="/dashboard">🏠 Dashboard</Link></li>
                    <li><Link to="/tasks">📋 Task Tracking</Link></li>
                    <li><Link to="/login">🔑 Login</Link></li>
                    <li><Link to="/register">📝 Register</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default NavigationBar;