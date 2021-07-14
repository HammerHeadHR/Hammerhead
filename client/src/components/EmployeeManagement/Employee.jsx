import React, { useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../App.jsx';

const Employee = ({ employee, setEmployees, editEmployee, getEmployees }) => {

  const user = useContext(UserContext);

  const toggleEmployeeAccess = () => {
    axios.put('/users/remove', { userId: employee.id })
      .then(response => {
        getEmployees();
      })
      .catch(error => console.error(error));
  };

  const contextTest = () => {
    console.log(user);
  }

  return (
    <div>
      <button onClick={contextTest}>Context Log</button>
      <p>{employee.username} - {employee.team}</p>
      {employee.active && <button onClick={() => editEmployee(employee)}>Update Employee</button>}
      <button onClick={toggleEmployeeAccess}>{employee.active ? 'Revoke Access' : 'Grant Access'}</button>
    </div>
  );

};

export default Employee;
