// src/components/UserProfilePage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import AddUserForm from './AddUserForm';
import { getUsers, getUserTasks } from '../api';

const UserProfilePage = ({ user, onLogout }) => {
  const [users, setUsers] = useState([]); // For admin view
  const [tasks, setTasks] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const navigate = useNavigate();

  // Fetch all users only if the logged-in user is an admin
  useEffect(() => {
    if (user.role === 'Admin') {
      getUsers().then(setUsers);
    }
  }, [user]);

  // Automatically fetch the logged-in user's tasks if they are not an admin
  useEffect(() => {
    if (user.role !== 'Admin') {
      handleGetHistory(user.email);
    }
  }, [user]);

  const handleGetHistory = async (email) => {
    const userTasks = await getUserTasks(email);
    setTasks(userTasks);
    setSelectedUser(email);
  };

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <div>
      <Navbar onLogout={handleLogout} />
      <h1>User Profiles</h1>
      {user.role === 'Admin' && !showAddForm && (
        <button onClick={() => setShowAddForm(true)}>Add New User</button>
      )}
      {showAddForm ? (
        <AddUserForm onCancel={() => setShowAddForm(false)} setUsers={setUsers} />
      ) : (
        <div className="user-list">
          {user.role === 'Admin' ? (
            // Admin view: Show all users
            users.map(u => (
              <div key={u.email}>
                Name: {u.name} Email: {u.email}{' '}
                <button onClick={() => handleGetHistory(u.email)}>Get History</button>
              </div>
            ))
          ) : (
            // Employee view: Show only the logged-in user's details
            <div>
              Name: {user.name} Email: {user.email}
            </div>
          )}
          {selectedUser && (
            <div>
              <h3>Tasks Worked By {selectedUser}</h3>
              {tasks.length > 0 ? (
                tasks.map(task => (
                  <div key={task.id}>
                    Title: {task.title} Description: {task.description} Status: {task.status}
                  </div>
                ))
              ) : (
                <p>No tasks found for this user.</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserProfilePage;