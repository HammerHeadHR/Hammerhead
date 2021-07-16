import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { UserContext } from '../../App.jsx';
import axios from 'axios';

const Sidebar = ({setSlide}) => {

  const user = useContext(UserContext);
  const [managementLink, setManagementLink] = useState(null);

  const menuSlide = () => {
    let element = document.getElementById('menu');
    element.classList.remove('show');
    setSlide(false);
  }

  useEffect(() => {
    axios.get('/current-user')
      .then(({ data }) => {
        if (data.admin) setManagementLink(<Link onClick={menuSlide} to="/dashboard/management">Employee Management</Link>);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <div id="sidebar">
        {managementLink}
        <Link onClick={menuSlide} to="/dashboard/data-charts">Data Tables</Link>
        <Link onClick={menuSlide} to="/dashboard/create-chart">Upload Data</Link>
    </div>
  );

};

export default Sidebar;
