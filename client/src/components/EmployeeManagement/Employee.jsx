import React from 'react';
import axios from 'axios';

const Employee = ({ employee, setEmployees, editEmployee, getEmployees }) => {

  const terminateEmployee = () => {
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
      <button onClick={terminateEmployee}>{employee.active ? 'Revoke Access' : 'Grant Access'}</button>
    </div>
  );

};

export default Employee;
