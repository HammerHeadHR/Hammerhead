import React, { useState, useEffect } from 'react';
import AddEmployeeForm from './AddEmployeeForm.jsx';
import EditEmployeeForm from './EditEmployeeForm.jsx';
import Employee from './Employee.jsx';
import axios from 'axios';

const EmployeeList = ({ employees, setEmployees, getEmployees, teamList }) => {

  const [addEmployee, setAddEmployee] = useState(false);
  const [editEmployee, setEditEmployee] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);
  const [employeesToRender, setEmployeesToRender] = useState(employees);
  const [team, setTeam] = useState('none');
  const [sort, setSort] = useState('Active -> Inactive');

  const addNewEmployee = () => {
    if (!teamList[0]) return window.alert('Please add a team to add employees to before adding employees.');
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

  const subSort = () => {
    let copy = employees.slice();
    return copy.sort((empA, empB) => {
      if (sort === 'A -> Z') {
        return empA.username.toLowerCase().charCodeAt(0) - empB.username.toLowerCase().charCodeAt(0);
      } else if (sort === 'Z -> A') {
        return empB.username.toLowerCase().charCodeAt(0) - empA.username.toLowerCase().charCodeAt(0);
      } else if (sort === 'Active -> Inactive') {
        return empA.active === empB.active ? 0 : empA.active ? -1 : 1;
      } else if (sort === 'Inactive -> Active') {
        return empA.active === empB.active ? 0 : empA.active ? 1 : -1;
      }
    });
  }

  useEffect(() => {
    setEmployeesToRender(subSort())
  }, [employees, sort]);

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
        <>
          <label htmlFor="team-select">Team Filter</label>
          <select name="team-select" id="team-select" defaultValue="none" onChange={({ target }) => setTeam(target.value)}>
            <option value="none">None</option>
            {teamList.map(team => <option key={team.id} value={team.name}>{team.name}</option> )}
          </select>

          <label htmlFor="sort-select">Sort By</label>
          <select name="sort-select" id="sort-select" defaultValue={sort} onChange={({ target }) => setSort(target.value)}>
            <option value="A -> Z">A -> Z</option>
            <option value="Z -> A">Z -> A</option>
            <option value="Active -> Inactive">Active -> Inactive</option>
            <option value="Inactive -> Active">Inactive -> Active</option>
          </select>

          {employeesToRender.map(employee => {
            if (team !== 'none' && employee.team === team) {
              return <Employee
              key={employee.id}
              employee={employee}
              getEmployees={getEmployees}
              editEmployee={showEditForm}
              />
            } else if (team === 'none') {
              return <Employee
              key={employee.id}
              employee={employee}
              getEmployees={getEmployees}
              editEmployee={showEditForm}
              />
            }
          })}
        </>
      }
      {!editEmployee ? <button onClick={addNewEmployee}>Add Employee</button> : null}
      {addEmployee ? <button onClick={() => setAddEmployee(false)}>Cancel</button> : null}
    </div>
  );

};

export default EmployeeList;
