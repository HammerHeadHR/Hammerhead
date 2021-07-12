import React, { useState } from 'react';
import AddEmployeeForm from './AddEmployeeForm.jsx';
import EditEmployeeForm from './EditEmployeeForm.jsx';
import Employee from './Employee.jsx';
import axios from 'axios';

const EmployeeList = ({ employees, setEmployees }) => {

  const [addEmployee, setAddEmployee] = useState(false);

  const addNewEmployee = () => {
    if (!addEmployee) return setAddEmployee(true);
    const employeeUsername = document.querySelector('#newUserUsername').value;
    const employeePassword = document.querySelector('#newUserPassword').value;
    const isAdmin = document.querySelector('#isAdmin').checked;
    const newEmployee = {
      "name" : employeeUsername,
      "password" : employeePassword,
      "admin" : isAdmin
    }
    // axios.post('/user', newEmployee)
    //   .then(response => {
    //     setEmployees(prev => [...prev, newEmployee]);
    //     setAddEmployee(false);
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });
    setEmployees(prev => [...prev, newEmployee]);
    setAddEmployee(false);
  }

  // const updateEmployeeInfo = (employee) => {
  //   axios.put('/user', employee)
  //     .then(response => console.log('update employee response: ', response))
  //     .catch(error => console.error(error));
  // };

  return (
    <div>
      <h3>Employees</h3>
      {addEmployee ?
          <AddEmployeeForm />
        :
          employees.map(employee => <Employee employee={employee} setEmployees={setEmployees}/>)
      }
      <button onClick={addNewEmployee}>Add Employee</button>
    </div>
  );

};

export default EmployeeList;
