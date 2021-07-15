import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { UserContext } from '../../App.jsx';

const Sidebar = () => {
  
  const user = useContext(UserContext);

  return (
    <div id="sidebar">
      {user.user.admim ?
        <Link to="/management">Employee Management</Link>
        :
        null
      }
        <Link to="/data-charts">Data Tables</Link>
        <Link to="/create-chart">Upload Data</Link>
    </div>
  );

};

export default Sidebar;
