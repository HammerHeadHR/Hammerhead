import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {shareData} from '../utilFunctions.js';
import {UserContext} from '../../App.jsx';

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
    let index = receivers.indexOf(id);
    let tempReceivers = [...receivers];
    tempReceivers.splice(index, 0);
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
      <div>
        <div>
          {employees.map((employee, i) => {return <Employee employee={employee} key={i} share={makeShareList} dontShare={takeFromShareList}/>})}
        </div>
        <button type='button' onClick={handleShare}>Share</button>
      </div>
    );
  } else {
    return null;
  }
};

const Employee = ({employee, share, dontShare}) => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    if (checked) {
      dontShare(employee.id)
    } else {
      share(employee.id);
    }
    setChecked(!checked);
  }

  return (
    <div>
      <p>{employee.username}</p>
      <input type="checkbox" onChange={handleChange}></input>
    </div>
  )
}

export default Share;