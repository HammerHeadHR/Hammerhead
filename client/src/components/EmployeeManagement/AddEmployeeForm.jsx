import React from 'react';

const AddEmployeeForm = ({ teams }) => {

  return (
    <div>
      <h3>Add Employee Form</h3>
      <label htmlFor="username">Employee Name:</label>
      <input id="newUserUsername" type="text" name="username"/>
      <label htmlFor="team">Employee Team:</label>
      <select name="teamSelect" id="team-select">
        {teams.map(team => <option key={team.id} value={team.name}>{team.name}</option> )}
      </select>
      <label htmlFor="password">Employee's Temporary Password:</label>
      <input id="newUserPassword" type="password" name="password"/>
      <label htmlFor="isAdmin">Make admin?</label>
      <input type="checkbox" id="isAdmin" name="isAdmin"/>
    </div>
  );

};

export default AddEmployeeForm;
