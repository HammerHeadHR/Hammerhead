import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Sidebar from '../Sidebar/index.jsx';
import EmployeeManagement from '../EmployeeManagement/index.jsx';
import DataCharts from '../DataCharts/index.jsx';
import ImportData from '../ImportData/index.jsx';
import HomeBar from '../HomeBar/index.jsx';

import { managers } from '../../../../dummyData/managers.js';
import { employees } from '../../../../dummyData/employees.js';
import { datapoints } from '../../../../dummyData/bitcoinPrices.js';

const Dashboard = ({ setAuthed }) => {

  const logout = () => {
    setAuthed(false);
  }

  return (
    <div>
      <Router>
        <HomeBar/>
        <Sidebar/>
        <Switch>
          <Route path="/management">
            <EmployeeManagement />
          </Route>
          <Route path="/data-charts">
            <DataCharts />
          </Route>
          <Route path="/create-chart">
            <ImportData data={datapoints}/>
          </Route>
        </Switch>
          <button onClick={logout}>Logout</button>
      </Router>
    </div>
  );

};

export default Dashboard;
