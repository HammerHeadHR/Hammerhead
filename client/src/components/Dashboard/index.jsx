import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Sidebar from '../Sidebar/index.jsx';
import EmployeeManagement from '../EmployeeManagement/index.jsx';
import DataCharts from '../DataCharts/index.jsx';
import ImportData from '../ImportData/index.jsx';
import AdminTables from '../AdminTables/index.jsx';
import HomeBar from '../HomeBar/index.jsx';

import { managers } from '../../../../dummyData/managers.js';
import { employees } from '../../../../dummyData/employees.js';

const Dashboard = () => {

  return (
    <div>
      <Router>
        <HomeBar/>
        <Sidebar/>
        <Switch>
          <Route path="/management">
            <EmployeeManagement managers={managers} employees={employees}/>
          </Route>
          <Route path="/data-charts">
            <DataCharts />
          </Route>
          <Route path="/create-chart">
            <ImportData />
          </Route>
          <Route path="/admin-tables">
            <AdminTables />
          </Route>
        </Switch>
      </Router>
    </div>
  );

};

export default Dashboard;
