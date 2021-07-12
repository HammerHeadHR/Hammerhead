import React, { useState } from 'react';

const EditEmployeeForm = ({ employee, editEmployee, updateEmployee }) => {

  const [updatedInfo, setUpdatedInfo] = useState({
    "username" : employee.name,
    "password" : employee.password,
    "admin" : employee.admin
  });

  const updateInfo = (event) => {
    setUpdatedInfo(prev => {
      let newDeets = Object.create(updatedInfo);
      newDeets[event.target.id] = event.target.value;
      return newDeets;
    });
  };

  const toggleAdmin = () => {
    setUpdatedInfo(prev => {
      let newDeets = Object.create(updatedInfo);
      newDeets.admin = !prev.admin;
      return newDeets;
    });
  };

  return (
    <div>
      <label htmlFor="username">Updated Employee Name: </label>
      <input id="username"type="text" name="username" onChange={(event) => updateInfo(event)}/>
      <label htmlFor="password">New Password: </label>
      <input id="password" type="password" name="password" onChange={(event) => updateInfo(event)}/>
      <label htmlFor="admin">Admin Status: </label>
      <input type="checkbox" id="adminStatus" name="admin" onChange={toggleAdmin}/>
      <button onClick={() => updateEmployee(updatedInfo)}>Update</button>
      <button onClick={() => editEmployee(null)}>Cancel</button>
    </div>
  );

};

export default EditEmployeeForm;
