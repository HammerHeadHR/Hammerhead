import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useHistory } from 'react-router-dom';
import Sidebar from '../Sidebar/index.jsx';
import EmployeeManagement from '../EmployeeManagement/index.jsx';
import DataCharts from '../DataCharts/index.jsx';
import ImportData from '../ImportData/index.jsx';
import HomeBar from '../HomeBar/index.jsx';
import ViewChart from '../ViewChart/index.jsx';

import { managers } from '../../../../dummyData/managers.js';
import { employees } from '../../../../dummyData/employees.js';
import { datapoints } from '../../../../dummyData/bitcoinPrices.js';

const Dashboard = ({ setAuthed }) => {

  const history = useHistory();
  const match = useRouteMatch();

  const logout = () => {
    setAuthed(false);
    history.push('/');
  }

  return (
    <div id="dashboard">
      <div id="menu">
        <HomeBar/>
        <Sidebar/>
        <button onClick={logout}>Logout</button>
      </div>
      <Switch>
          <div id="inner">
            <Route path={`/dashboard/management`}>
              <EmployeeManagement />
            </Route>
            <Route path={`/dashboard/data-charts`}>
              <DataCharts />
            </Route>
            <Route path={`/dashboard/create-chart`}>
              <ImportData data={datapoints}/>
            </Route>
            <Route path={`/dashboard/view-chart/:datasetId`}>
              <ViewChart />
            </Route>
          </div>
        </Switch>
    </div>
  );

};

export default Dashboard;
