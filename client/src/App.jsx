import React from 'react';
import Login from './components/Login/index.jsx';
import Dashboard from './components/Dashboard/index.jsx';
import EmployeeManagement from './components/EmployeeManagement/index.jsx';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const App = () => {

  return (
    <Router>
      <Link to="/dashboard">Dashboard</Link>
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route path="/dashboard" component={Dashboard}/>
      </Switch>
    </Router>
  );

};

export default App;
