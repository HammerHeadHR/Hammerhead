import React from 'react';

const AddEmployeeForm = ({ teams }) => {

  return (
    <div id="add-employee">
      <h3>Add Employee Form</h3>
      <div>
        <label htmlFor="username">Employee Name:</label>
        <input id="newUserUsername" type="text" name="username"/>
      </div>
      <div>
        <label htmlFor="team">Employee Team:</label>
        <select name="teamSelect" id="team-select">
          {teams.map(team => <option key={team.id} value={team.name}>{team.name}</option> )}
        </select>
      </div>
      <div>
        <label htmlFor="password">Employee's Password:</label>
        <input id="newUserPassword" type="password" name="password"/>
      </div>
      <div>
        <label htmlFor="isAdmin">Make admin?</label>
        <input type="checkbox" id="isAdmin" name="isAdmin"/>
      </div>
    </div>
  );

};

export default AddEmployeeForm;
