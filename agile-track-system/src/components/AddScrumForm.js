import React, { useState } from 'react';
import { addScrumTeam, getScrumTeams } from '../api';

const AddScrumForm = ({ onCancel, setTeams }) => {
  const [name, setName] = useState('');
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskStatus, setTaskStatus] = useState('To Do');
  const [assignTo, setAssignTo] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !taskTitle || !taskDescription || !assignTo) {
      setError('All fields are required');
      return;
    }

    const newTeam = {
      name,
      tasks: [{ id: Date.now(), title: taskTitle, description: taskDescription, status: taskStatus, assignedTo: assignTo }],
      users: [assignTo]
    };
    await addScrumTeam(newTeam);
    const updatedTeams = await getScrumTeams();
    setTeams(updatedTeams);
    onCancel();
  };

  return (
    <div>
      <h2>Add New Scrum</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Scrum Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="Task Title" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} />
        <input type="text" placeholder="Task Description" value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} />
        <select value={taskStatus} onChange={(e) => setTaskStatus(e.target.value)}>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        <input type="text" placeholder="Assign To (email)" value={assignTo} onChange={(e) => setAssignTo(e.target.value)} />
        <button type="submit">Create Scrum</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default AddScrumForm;