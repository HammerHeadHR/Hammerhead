import React from 'react';

const EditEmployeeForm = ({ employee, editEmployee }) => {

  return (
    <div>
      Edit Employee Info Here
      <button>Update</button>
      <button onClick={() => editEmployee(false)}>Cancel</button>
    </div>
  );

};

export default EditEmployeeForm;
