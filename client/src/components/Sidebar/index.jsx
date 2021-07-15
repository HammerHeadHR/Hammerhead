import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';


const Sidebar = () => {

  return (
    <div id="sidebar">
        <Link to="/dashboard/management">Employee Management</Link>
        <br/>
        <Link to="/dashboard/data-charts">Data Tables</Link>
        <br/>
        <Link to="/dashboard/create-chart">Upload Data</Link>
        <br/>
    </div>
  );

};

export default Sidebar;
