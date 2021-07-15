import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { UserContext } from '../../App.jsx';

const Sidebar = ({setSlide}) => {

  const user = useContext(UserContext);

  const menuSlide = () => {
    let element = document.getElementById('menu');
    element.classList.remove('show');
    setSlide(false);
  }

  return (
    <div id="sidebar">
      {user.user.admin ?
        <Link onClick={menuSlide} to="/dashboard/management">Employee Management</Link>
        :
        null
      }
        <Link onClick={menuSlide} to="/dashboard/data-charts">Data Tables</Link>
        <Link onClick={menuSlide} to="/dashboard/create-chart">Upload Data</Link>
    </div>
  );

};

export default Sidebar;
