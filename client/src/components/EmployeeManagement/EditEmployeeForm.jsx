import React, { useState } from 'react';

const EditEmployeeForm = ({ employee, editEmployee, updateEmployee, teams }) => {

  const [updatedInfo, setUpdatedInfo] = useState({
    "userId" : employee.id,
    "username" : employee.username,
    "password" : employee.password,
    "team" : employee.team,
    "admin" : false
  });

  const updateInfo = (event) => {
    setUpdatedInfo(prev => {
      let newDeets = {...prev};
      newDeets[event.target.id] = event.target.value;
      console.log(newDeets);
      return newDeets;
    });
  };

  const toggleAdmin = (event) => {
    setUpdatedInfo(prev => {
      let newDeets = {...prev};
      newDeets.admin = event.target.checked;
      return newDeets;
    });
  };

  const updateTeam = (event) => {
    setUpdatedInfo(prev => {
      let newDeets = {...prev};
      newDeets.team = event.target.value;
      return newDeets;
    })
  }

  return (
    <div>
      <label htmlFor="username">Current Name: {employee.username} - New Employee Name: </label>
      <input id="username"type="text" name="username" onChange={(event) => updateInfo(event)}/>
      <label htmlFor="password">New Password: </label>
      <input id="password" type="password" name="password" onChange={(event) => updateInfo(event)}/>
      <label htmlFor="team">Current Team: {employee.team} - New Team: </label>
      <select name="newTeamSelect" id="new-team-select" onChange={updateTeam}>
        {teams.map(team => <option key={team.id} value={team.name}>{team.name}</option> )}
      </select>
      <label htmlFor="admin">Admin Status: </label>
      <input type="checkbox" id="adminStatus" name="admin" onChange={toggleAdmin}/>
      <button onClick={() => updateEmployee(updatedInfo)}>Update</button>
      <button onClick={() => editEmployee(null)}>Cancel</button>
    </div>
  );

};

export default EditEmployeeForm;
