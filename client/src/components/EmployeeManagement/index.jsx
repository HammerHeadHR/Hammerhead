import React, { useState, useEffect } from 'react';
import EmployeeList from './EmployeeList.jsx';
import TeamList from './TeamList.jsx';
import axios from 'axios';

const EmployeeManagement = ({ employees, managers }) => {

  const [employeeList, setEmployeeList] = useState(employees);
  const [teamList, setTeamList] = useState(managers);


  // const getEmployees = () => {
  //   axios.get('/employees')
  //     .then(({ data }) => {
  //       setEmployeeList(data);
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // }

  // const getTeams = () => {
  //   axios.get('/teams')
  //   .then(({ data }) => {
  //     setTeamList(data);
  //   })
  //   .catch(error => {
  //     console.error(error);
  //   });
  // }

  // useEffect(() => {
  //   getEmployees();
  //   getTeams();
  // }, []);

  return (
    <div>
      <TeamList teams={teamList}/>
      <EmployeeList employees={employeeList} setEmployees={setEmployeeList}/>
    </div>
  );

};

export default EmployeeManagement;
