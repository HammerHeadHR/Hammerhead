import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';


const Sidebar = () => {

  return (
    <div id="sidebar">
        <Link to="/management">Employee Management</Link>
        <Link to="/data-charts">Data Tables</Link>
        <Link to="/create-chart">Upload Data</Link>
    </div>
  );

};

export default Sidebar;
