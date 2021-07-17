import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Employee from '../SharedComponents/Employee.jsx';


const SharingModal = ({makeShareList, takeFromShareList, datasetId}) => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get('/users/')
    .then((users) => {
      setEmployees(users.data);
    })
  }, []);


  return (
    <div id="sharing-modal">
      <div id="employeesModal">
          {employees.map((employee, i) => {return <Employee employee={employee} key={i} share={makeShareList} dontShare={takeFromShareList}/>})}
        </div>
    </div>
  )
}

export default SharingModal;