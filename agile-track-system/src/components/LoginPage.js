// src/components/LoginPage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../api';

const LoginPage = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('All fields are required');
      return;
    }
    if (!email.includes('@')) {
      setError("Please include an '@'");
      return;
    }

    const user = await loginUser(email, password);
    if (user) {
      setUser(user);
      navigate(user.role === 'Admin' ? '/admin' : '/user');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div>
      <nav>
        <Link to="/">Dashboard</Link>
        <Link to="/login">Login</Link>
      </nav>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        <Link to="/signup"><button>Sign Up</button></Link>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default LoginPage;