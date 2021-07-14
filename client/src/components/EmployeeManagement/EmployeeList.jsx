import React, { useState } from 'react';
import AddEmployeeForm from './AddEmployeeForm.jsx';
import EditEmployeeForm from './EditEmployeeForm.jsx';
import Employee from './Employee.jsx';
import axios from 'axios';

const EmployeeList = ({ employees, setEmployees, getEmployees, teamList }) => {

  const [addEmployee, setAddEmployee] = useState(false);
  const [editEmployee, setEditEmployee] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);

  const addNewEmployee = () => {
    if (!teamList[0]) return window.alert('Please add a team to add employees to before adding employees');
    if (!addEmployee) return setAddEmployee(true);
    const employeeUsername = document.querySelector('#newUserUsername').value;
    const employeePassword = document.querySelector('#newUserPassword').value;
    const employeeTeam = document.querySelector('#team-select').value;
    const isAdmin = document.querySelector('#isAdmin').checked;
    const newEmployee = {
      "username" : employeeUsername,
      "password" : employeePassword,
      "team" : employeeTeam || teamList[0].name,
      "admin" : isAdmin
    }
    if (employeeUsername && employeePassword) {
      axios.post('/users/create', newEmployee)
      .then(response => {
        console.log('employee added: ', newEmployee);
        getEmployees();
        setAddEmployee(false);
      })
      .catch(error => {
        console.error(error);
      });
    } else {
      alert(`Please make sure you fill out username and password.\nThe team will default to the first created team if you did not pick one.\nAdmin access will not be granted if the checkbox is left unchecked.`);
    }
  }

  const updateEmployeeInfo = (employee) => {
    if (!employee.team) employee.team = teamList[0].name;
    const validTeam = teamList.some(team => team.name === employee.team);
    if (!validTeam) return window.alert('Please enter a valid team name.');
    axios.put('/users/update', employee)
      .then(response => getEmployees())
      .catch(error => console.error(error));
    showEditForm();
  };

  const showEditForm = (employee) => {
    if (!editEmployee) {
      setEditEmployee(true);
      setEmployeeToEdit(employee);
    } else {
      setEditEmployee(false);
      setEmployeeToEdit(null);
    }
  }

  return (
    <div>
      <h3>Employees</h3>
      {editEmployee ?
        <EditEmployeeForm
          getEmployees={getEmployees}
          employee={employeeToEdit}
          editEmployee={showEditForm}
          updateEmployee={updateEmployeeInfo}
          defaultTeam={teamList[0]}
          teams={teamList}
        />
        :
      addEmployee ?
          <AddEmployeeForm teams={teamList}/>
        :
        employees.map(employee => {
          return <Employee
            key={employee.id}
            employee={employee}
            getEmployees={getEmployees}
            editEmployee={showEditForm}
          />
          // sort to show active employees at top
        }).sort((a, b) => a.props.employee.active === b.props.employee.active ? 0 : a.props.employee.active ? -1 : 1)
      }
      {!editEmployee ? <button onClick={addNewEmployee}>Add Employee</button> : null}
      {addEmployee ? <button onClick={() => setAddEmployee(false)}>Cancel</button> : null}
    </div>
  );

};

export default EmployeeList;
