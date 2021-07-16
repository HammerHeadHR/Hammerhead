import React, { useState, useEffect }  from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useHistory } from 'react-router-dom';
import Header from '../Header/index.jsx';
import Sidebar from '../Sidebar/index.jsx';
import EmployeeManagement from '../EmployeeManagement/index.jsx';
import DataCharts from '../DataCharts/index.jsx';
import ImportData from '../ImportData/index.jsx';
import HomeBar from '../HomeBar/index.jsx';
import start from '../../../dist/img/ring.wav';
import ViewChart from '../ViewChart/index.jsx';

import { managers } from '../../../../dummyData/managers.js';
import { employees } from '../../../../dummyData/employees.js';
import { datapoints } from '../../../../dummyData/bitcoinPrices.js';

const Dashboard = ({ setAuthed }) => {

  const history = useHistory();
  const match = useRouteMatch();
  const [slide, setSlide] = useState(false);

  useEffect(() => {
    const audioEl = document.getElementsByClassName("audio-element")[0]
    audioEl.play()
  });

  const logout = () => {
    setAuthed(false);
    history.push('/');
  }

  return (
    <div id="dashboard">
      <audio className="audio-element">
          <source src={start}></source>
      </audio>
      <Header slide={slide} setSlide={setSlide} />
      <div id="menu">
        <HomeBar/>
        <Sidebar setSlide={setSlide} />
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
