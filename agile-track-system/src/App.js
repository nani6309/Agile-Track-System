// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import UserHomePage from './components/UserHomePage';
import AdminHomePage from './components/AdminHomePage';
import UserProfilePage from './components/UserProfilePage';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  // Load user from localStorage on app startup
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Update localStorage whenever user changes
  const handleSetUser = (userData) => {
    setUser(userData);
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData));
    } else {
      localStorage.removeItem('user');
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={user ? <Navigate to={user.role === 'Admin' ? '/admin' : '/user'} /> : <LoginPage setUser={handleSetUser} />} />
          <Route path="/signup" element={<SignUpPage setUser={handleSetUser} />} />
          <Route path="/user" element={user && user.role === 'Employee' ? <UserHomePage user={user} onLogout={handleLogout} /> : <Navigate to="/login" />} />
          <Route path="/admin" element={user && user.role === 'Admin' ? <AdminHomePage user={user} onLogout={handleLogout} /> : <Navigate to="/login" />} />
          <Route path="/profiles" element={user ? <UserProfilePage user={user} onLogout={handleLogout} /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;