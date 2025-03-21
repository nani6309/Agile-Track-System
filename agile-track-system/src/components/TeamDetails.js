import React, { useState } from 'react';
import { updateTaskStatus, getScrumTeamById } from '../api';

const TeamDetails = ({ team: initialTeam, user, onBack, isAdmin = false }) => {
  const [team, setTeam] = useState(initialTeam); // State to hold team data

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await updateTaskStatus(team.id, taskId, newStatus);
      // Fetch the updated team data after the status change
      const updatedTeam = await getScrumTeamById(team.id);
      setTeam(updatedTeam); // Update the state to re-render the component
    } catch (error) {
      console.error('Failed to update task status:', error);
    }
  };

  return (
    <div>
      <h2>Scrum Details for {team.name}</h2>
      <button onClick={onBack}>Back</button>
      <div className="task-list">
        <h3>Tasks</h3>
        {team.tasks.map(task => (
          <div key={task.id}>
            {task.title}: {task.description} - {task.status}
            {isAdmin && (
              <select
                value={task.status}
                onChange={(e) => handleStatusChange(task.id, e.target.value)}
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            )}
          </div>
        ))}
      </div>
      <div className="user-list">
        <h3>Users</h3>
        {team.users.map(email => (
          <div key={email}>{email}</div>
        ))}
      </div>
    </div>
  );
};

export default TeamDetails;