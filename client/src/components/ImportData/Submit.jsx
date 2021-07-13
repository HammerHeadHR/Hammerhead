import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Share = ({datasetId}) => {
  const [employees, setEmployees] = useState([]);

  // request list of employees
  useEffect(
    axios.get('/users')
    .then((users) => {
      setEmployees(users.body);
    })
  )
  //
  if (employees.length) {
    return (
      <div>
        <select></select>
        <button>Share</button>
      </div>
    );
  } else {
    return null;
  }
};

const Employee = ({employee}) => {
  return (
    <div>
      <p>{employee.username}</p>
      <input type="checkbox" value={employee.id}></input>
    </div>
  )
}

export default Share;