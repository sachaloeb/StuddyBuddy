//import logo from './logo.svg';
//import './App.css';

import React from 'react';
import { Link } from 'react-router-dom';
import Counter from './components/Counter';

const App = () => {
  return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h1>Welcome to StudyBuddy 📚</h1>
        <p>Your personal assistant for managing tasks and study schedules!</p>

        <nav>
          <Link to="/tasks" style={navStyle}>📋 Task Tracking</Link> |
          <Link to="/schedule" style={navStyle}>📅 Schedule Organizer</Link>
        </nav>

        <h2>Try our Counter Component</h2>
        <Counter />
      </div>
  );
};

const navStyle = { margin: '0 10px', textDecoration: 'none', fontSize: '18px' };

export default App;

