// src/components/UserHomePage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import TeamDetails from './TeamDetails';
import { getScrumTeams } from '../api';

const UserHomePage = ({ user, onLogout }) => {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getScrumTeams().then(setTeams);
  }, []);

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <div>
      <Navbar onLogout={handleLogout} />
      <h1>Scrum Teams</h1>
      {!selectedTeam ? (
        <div className="team-list">
          {teams.map(team => (
            <div key={team.id}>
              {team.name} <button onClick={() => setSelectedTeam(team)}>Get Details</button>
            </div>
          ))}
        </div>
      ) : (
        <TeamDetails
          team={selectedTeam}
          user={user}
          onBack={() => setSelectedTeam(null)}
        />
      )}
    </div>
  );
};

export default UserHomePage;