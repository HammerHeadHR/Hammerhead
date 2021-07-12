import React from 'react';

const Employee = ({ employee, setEmployees }) => {

  const terminateEmployee = () => {
    setEmployees(prev => {
      const prevCopy = [...prev];
      for (let i = 0; i < prevCopy.length; i++) {
        const element = prevCopy[i];
        if (element.name === employee.name) {
          prevCopy.splice(i, 1);
          break;
        }
      }
      return prevCopy;
    });
  }

  const toggleAdmin = () => {
    // PUT emp.admin = !emp.admin
    console.log(employee);
    employee.admin = !employee.admin;
  };

  return (
    <div>
      <p key={employee.name}>{employee.name}</p>
      <button onClick={toggleAdmin}>Toggle Admin</button>
      <button>Update Employee</button>
      <button onClick={terminateEmployee}>Terminate</button>
    </div>
  );

};

export default Employee;
