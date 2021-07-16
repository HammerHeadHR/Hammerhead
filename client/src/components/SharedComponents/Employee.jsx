import React, {useState, useEffect} from 'react';


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
    <div id="employee">
      <p>{employee.username}</p>
      <input type="checkbox" onChange={handleChange}></input>
    </div>
  )
}

export default Employee;