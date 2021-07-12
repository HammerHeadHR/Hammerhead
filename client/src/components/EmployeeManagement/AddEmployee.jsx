import React from 'react';

const AddEmployee = () => {

  return (
    <div>
      <h3>Add Employee Form</h3>
      <label htmlFor="username">New Employee Name:</label>
      <input id="newUserUsername"type="text" name="username"/>
      <label htmlFor="password">Employee's Temporary Password:</label>
      <input id="newUserPassword" type="password" name="password"/>
      <label htmlFor="salary">Employee's Salary:</label>
      <input id="newUserSalary" type="text" name="salary"/>
    </div>
  );

};

export default AddEmployee;
