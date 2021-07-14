import React, { useState } from 'react';
import axios from 'axios';

const EditEmployeeForm = ({ employee, editEmployee, updateEmployee, teams, getEmployees }) => {

  const updateTextField = (event) => {
    const field = event.target.id.substring(7);
    const newValue = document.querySelector(`#${field}`).value;
    if (!newValue) return alert('Please enter a new value.');
    axios.put(`/users/${field}`, { userId: employee.id, [field]: newValue })
      .then(response => employee[field] = newValue)
      .catch(error => console.error(error));
  }

  const updateTeam = (event) => {
    const newTeam = document.querySelector('#teamId').value;
    axios.put('users/team', { userId: employee.id, teamId: Number(newTeam)})
      .then(response => getEmployees())
      .catch(error => console.error(error));
  };

  const toggleAdmin = (event) => {
    let isAdmin = document.querySelector('#admin').value;
    const reqBody = {
      userId: employee.id,
      admin: isAdmin === 'true' ? true : false
    };
    axios.put('/users/admin', reqBody)
      .then(response => employee.admin = !employee.admin)
      .catch(error => console.error(error));
  }

  return (
    <div>
      <label htmlFor="username">Employee Name: </label>
      <input id="username"type="text" name="username" placeholder={employee.username}/>
      <button id="update-username" onClick={updateTextField}>Update Username</button>

      <label htmlFor="password">New Password: </label>
      <input id="password" type="password" name="password"/>
      <button id="update-password" onClick={updateTextField}>Update Password</button>

      <label htmlFor="team">New Team: </label>
      <select name="newTeamSelect" id="teamId" defaultValue={employee.team_id}>
        {teams.map(team => <option key={team.id} value={team.id}>{team.name}</option> )}
      </select>
      <button id="update-teamId" onClick={updateTeam}>Update Team</button>

      <label htmlFor="admin">Admin Status: </label>
      <select id="admin" name="admin" defaultValue={employee.admin ? "true" : "false"}>
        <option value="true">Admin</option>
        <option value="false">Non-Admin</option>
      </select>
      <button onClick={toggleAdmin}>Update Admin Status</button>

      <button onClick={() => editEmployee(null)}>Cancel</button>
    </div>
  );

};

export default EditEmployeeForm;
