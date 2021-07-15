import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { UserContext } from '../../App.jsx';

const Sidebar = () => {

  const user = useContext(UserContext);

  return (
    <div id="sidebar">
      {user.user.admin ?
        <Link to="/dashboard/management">Employee Management</Link>
        :
        null
      }
        <Link to="/dashboard/data-charts">Data Tables</Link>
        <Link to="/dashboard/create-chart">Upload Data</Link>
    </div>
  );

};

export default Sidebar;
