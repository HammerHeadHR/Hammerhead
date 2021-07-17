import React, { useState, useEffect } from 'react';
import EmployeeList from './EmployeeList.jsx';
import TeamList from './TeamList.jsx';
import axios from 'axios';

const EmployeeManagement = ({ employees, managers }) => {

  const [employeeList, setEmployeeList] = useState([]);
  const [teamList, setTeamList] = useState([]);

  const getEmployees = () => {
    axios.get('/users/')
      .then(({ data }) => {
        console.log('user list: ', data);
        setEmployeeList(data);
        getTeams();
      })
      .catch(error => {
        console.error(error);
      });
  }

  const getTeams = () => {
    axios.get('/teams/')
    .then(({ data }) => {
      setTeamList(data);
    })
    .catch(error => {
      console.error(error);
    });
  }

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <div id="management">
      <TeamList
        teams={teamList}
        setTeams={setTeamList}
        getTeams={getTeams}
      />
      <EmployeeList
        employees={employeeList}
        setEmployees={setEmployeeList}
        getEmployees={getEmployees}
        teamList={teamList}
      />
    </div>
  );

};

export default EmployeeManagement;
