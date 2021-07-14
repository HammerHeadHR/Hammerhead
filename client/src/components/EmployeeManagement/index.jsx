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

  // put team name at employee.team instead of just having team id @ employee.team_id
  const addTeamNames = () => {
    setEmployeeList(prev => {
      return prev.map(employee => {
        for (let i = 0; i < teamList.length; i++) {
          const team = teamList[i];
          if (employee.team_id === team.id) {
            employee.team = team.name;
            break;
          }
        }
        return employee;
      });
    });
  }

  useEffect(() => {
    getEmployees();
  }, []);

  useEffect(() => {
    addTeamNames();
  }, [teamList]);



  return (
    <div>
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
