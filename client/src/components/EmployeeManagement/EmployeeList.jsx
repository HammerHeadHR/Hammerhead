import React, { useState } from 'react';
import AddEmployee from './AddEmployee.jsx';
import Employee from './Employee.jsx';

const EmployeeList = ({ employees, setEmployees }) => {

  const [addEmployee, setAddEmployee] = useState(false);

  const addNewEmployee = () => {
    if (!addEmployee) return setAddEmployee(prev => !prev);
    const employeeUsername = document.querySelector('#newUserUsername').value;
    const employeePassword = document.querySelector('#newUserPassword').value;
    const isAdmin = document.querySelector('#isAdmin').checked;
    const newEmployee = {
      "name" : employeeUsername,
      "password" : employeePassword,
      "admin" : isAdmin
    }
    setEmployees(prev => [...prev, newEmployee]);
    setAddEmployee(prev => !prev);
  }

  return (
    <div>
      <h3>Employees</h3>
      {addEmployee ?
          <AddEmployee />
        :
          employees.map(employee => <Employee employee={employee} setEmployees={setEmployees}/>)
      }
      <button onClick={addNewEmployee}>Add Employee</button>
    </div>
  );

};

export default EmployeeList;
