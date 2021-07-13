import React from 'react';

const AddEmployeeForm = () => {

  return (
    <div>
      <h3>Add Employee Form</h3>
      <label htmlFor="username">Employee Name:</label>
      <input id="newUserUsername"type="text" name="username"/>
      <label htmlFor="password">Employee's Temporary Password:</label>
      <input id="newUserPassword" type="password" name="password"/>
      <label htmlFor="isAdmin">Make admin?</label>
      <input type="checkbox" id="isAdmin" name="isAdmin"/>
    </div>
  );

};

export default AddEmployeeForm;
