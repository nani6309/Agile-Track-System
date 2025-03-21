import React, { useState } from 'react';
import { addUser, getUsers } from '../api';

const AddUserForm = ({ onCancel, setUsers }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Employee');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError('All fields are required');
      return;
    }
    if (!email.includes('@')) {
      setError("Please include an '@'");
      return;
    }

    const newUser = { name, email, password, role };
    await addUser(newUser);
    const updatedUsers = await getUsers();
    setUsers(updatedUsers);
    onCancel();
  };

  return (
    <div>
      <h2>Add New User</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="Employee">Employee</option>
          <option value="Admin">Admin</option>
        </select>
        <button type="submit">Create User</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default AddUserForm;