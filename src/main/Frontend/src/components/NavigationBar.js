import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import profileIcon from "../assets/user-profile-icon.svg";
import "../index.css";
import api from "../utils/api";

const NavigationBar = () => {
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();

    const handleProfileClick = () => {
        setShowMenu(!showMenu);
    };

    const handleLogout = async () => {
        try{
            setShowMenu(false);
            localStorage.removeItem("token");
            await api.logout();
            navigate("/login");
        } catch (error) {
            console.error('Error logging out:', error);
            alert('Failed to logout. Please try again.');
        }
    };

    return (
        <div>
            <header>
                <h1>StudyBuddy</h1>
                <img src={profileIcon} alt="Profile Icon" id="profileIcon" onClick={handleProfileClick} />
                {showMenu && (
                    <div className="dropdown-menu">
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                )}
            </header>
            <nav className="navbar">
                <ul>
                    <li><Link to="/dashboard">🏠 Dashboard</Link></li>
                    <li><Link to="/tasks">📋 Task Tracking</Link></li>
                    <li><Link to="/breakReminders">⏰ Break Reminders</Link></li>
                    <li><Link to="/login">🔑 Login</Link></li>
                    <li><Link to="/register">📝 Register</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default NavigationBar;