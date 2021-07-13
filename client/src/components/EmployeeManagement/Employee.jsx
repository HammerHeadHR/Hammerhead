import React from 'react';
import axios from 'axios';

const Employee = ({ employee, setEmployees, editEmployee}) => {

  const terminateEmployee = () => {
    setEmployees(prev => {
      const prevCopy = [...prev];
      for (let i = 0; i < prevCopy.length; i++) {
        if (prevCopy[i].name === employee.name) {
          prevCopy.splice(i, 1);
          break;
        }
      }
      return prevCopy;
    });
    // consider running above loop to remove employee from current empList after removing
    // send id
    // axios.put('/user/delete', { userId: employee.id})
    //   .then(response => console.log('delete user response: ', response))
    //   .catch(error => console.error(error));
  }

  return (
    <div>
      <p key={employee.name}>{employee.name}</p>
      <button onClick={() => editEmployee(employee)}>Update Employee</button>
      <button onClick={terminateEmployee}>Terminate</button>
    </div>
  );

};

export default Employee;
