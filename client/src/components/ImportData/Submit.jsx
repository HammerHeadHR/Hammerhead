import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {shareData} from '../utilFunctions.js';
import {UserContext} from '../../App.jsx';
import Employee from '../SharedComponents/Employee.jsx';

const Share = ({datasetId}) => {

  let user = useContext(UserContext);

  const [employees, setEmployees] = useState([]);
  const [receivers, setReceivers] = useState([]);


  useEffect(() => {
    axios.get('/users/')
    .then((users) => {
      setEmployees(users.data);
    })
  }, []);

  const makeShareList = (id) => {
    let tempReceivers = [...receivers];
    tempReceivers.push(id);
    setReceivers(tempReceivers);
  }

  const takeFromShareList = (id) => {
    // change to .filter
    let index = receivers.indexOf(id);
    let tempReceivers = [...receivers];
    tempReceivers.splice(index, 1);
    setReceivers(tempReceivers);
  }

  const handleShare = () => {
    let requests = receivers.map((employeeId) => {
      shareData(Number(user.user.id), Number(employeeId), Number(datasetId))
    })

    Promise.all(requests)
    .then(() => console.log('All Notified'));
  }

  if (employees.length) {
    return (
      <div id="share">
        <label htmlFor="employees">Share with...</label>
        <div id="employees">
          {employees.map((employee, i) => {return <Employee employee={employee} key={i} share={makeShareList} dontShare={takeFromShareList}/>})}
        </div>
        <button type='button' onClick={handleShare}>Share</button>
      </div>
    );
  } else {
    return null;
  }
};


export default Share;