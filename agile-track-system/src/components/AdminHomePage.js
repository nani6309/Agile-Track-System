// src/components/AdminHomePage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import TeamDetails from './TeamDetails';
import AddScrumForm from './AddScrumForm';
import { getScrumTeams } from '../api';

const AdminHomePage = ({ user, onLogout }) => {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
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
      {!selectedTeam && !showAddForm ? (
        <>
          <button onClick={() => setShowAddForm(true)}>Add New Scrum</button>
          <div className="team-list">
            {teams.map(team => (
              <div key={team.id}>
                {team.name} <button onClick={() => setSelectedTeam(team)}>Get Details</button>
              </div>
            ))}
          </div>
        </>
      ) : selectedTeam ? (
        <TeamDetails
          team={selectedTeam}
          user={user}
          onBack={() => setSelectedTeam(null)}
          isAdmin
        />
      ) : (
        <AddScrumForm onCancel={() => setShowAddForm(false)} setTeams={setTeams} />
      )}
    </div>
  );
};

export default AdminHomePage;