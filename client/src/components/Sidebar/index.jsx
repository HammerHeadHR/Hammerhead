import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';


const Sidebar = () => {

  return (
    <div>
        <Link to="/management">Employee Management</Link>
        <br/>
        <Link to="/data-charts">Data Tables</Link>
        <br/>
        <Link to="/create-chart">Upload Data</Link>
        <br/>
        <Link to="/admin-tables">Admin Tables</Link>
    </div>
  );

};

export default Sidebar;
