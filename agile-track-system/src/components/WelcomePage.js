import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getScrumTeams } from '../api';

const WelcomePage = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    getScrumTeams().then(setTeams);
  }, []);

  return (
    <div>
      <nav>
        <Link to="/">Dashboard</Link>
        <Link to="/login">Login</Link>
      </nav>
      <h1>Scrum Teams</h1>
      <div className="team-list">
        {teams.map(team => (
          <div key={team.id}>
            {team.name} <Link to="/login"><button>Get Details</button></Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WelcomePage;