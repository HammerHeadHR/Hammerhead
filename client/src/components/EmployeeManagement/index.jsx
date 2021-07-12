import React, { useState, useEffect } from 'react';
import EmployeeList from './EmployeeList.jsx';
import TeamList from './TeamList.jsx';

const EmployeeManagement = ({ employees, managers }) => {

  const [employeeList, setEmployeeList] = useState(employees);

  return (
    <div>
      <TeamList teams={managers}/>
      <EmployeeList employees={employeeList} setEmployees={setEmployeeList}/>
    </div>
  );

};

export default EmployeeManagement;
