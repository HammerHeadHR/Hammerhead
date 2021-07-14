import React, { useContext } from 'react';
import axios from 'axios';

const Employee = ({ employee, setEmployees, editEmployee, getEmployees }) => {

  const toggleEmployeeAccess = () => {
    axios.put('/users/remove', { userId: employee.id })
      .then(response => {
        getEmployees();
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <p>{employee.username} - {employee.team}</p>
      {employee.active && <button onClick={() => editEmployee(employee)}>Update Employee</button>}
      <button onClick={toggleEmployeeAccess}>{employee.active ? 'Revoke Access' : 'Grant Access'}</button>
    </div>
  );

};

export default Employee;
