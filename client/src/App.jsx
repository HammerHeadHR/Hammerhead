import React, { useState } from 'react';
import Login from './components/Login/index.jsx';
import Dashboard from './components/Dashboard/index.jsx';
import EmployeeManagement from './components/EmployeeManagement/index.jsx';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const App = () => {

  const [authed, setAuthed] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {!authed ?
            <Login setUser={setUser} setAuthed={setAuthed}/>
          :
            <Dashboard user={user} setAuthed={setAuthed}/>
          }
        </Route>
      </Switch>
    </Router>
  );

};

export default App;
