import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ onLogout }) => (
  <nav>
    <Link to={window.location.pathname.includes('/admin') ? '/admin' : '/user'}>Dashboard</Link>
    <Link to="/profiles">Profiles</Link>
    <button onClick={onLogout}>Logout</button>
  </nav>
);

export default Navbar;