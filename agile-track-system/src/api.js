// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:3002'; // Changed to 3002

export const loginUser = async (email, password) => {
  const response = await axios.get(`${API_URL}/users?email=${email}&password=${password}`);
  return response.data.length > 0 ? response.data[0] : null;
};

export const signUpUser = async (user) => {
  const response = await axios.post(`${API_URL}/users`, user);
  return response.data;
};

export const getScrumTeams = async () => {
  const response = await axios.get(`${API_URL}/scrumTeams`);
  return response.data;
};

export const getScrumTeamById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/scrumTeams/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch team with id ${id}:`, error.message);
    throw error;
  }
};

export const addScrumTeam = async (team) => {
  const response = await axios.post(`${API_URL}/scrumTeams`, team);
  return response.data;
};

export const updateTaskStatus = async (teamId, taskId, status) => {
  try {
    const team = await getScrumTeamById(teamId);
    if (!team) {
      throw new Error(`Team with id ${teamId} not found`);
    }
    const updatedTasks = team.tasks.map(task =>
      task.id === taskId ? { ...task, status } : task
    );
    await axios.patch(`${API_URL}/scrumTeams/${teamId}`, { tasks: updatedTasks });
  } catch (error) {
    console.error('Error updating task status:', error.message);
    throw error;
  }
};

export const getUsers = async () => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
};

export const addUser = async (user) => {
  const response = await axios.post(`${API_URL}/users`, user);
  return response.data;
};

export const getUserTasks = async (email) => {
  const teams = await getScrumTeams();
  const userTasks = [];
  teams.forEach(team => {
    team.tasks.forEach(task => {
      if (task.assignedTo === email) {
        userTasks.push({ ...task, team: team.name });
      }
    });
  });
  return userTasks;
};