import React, { useState, useContext } from 'react';
import Login from './components/Login/index.jsx';
import Dashboard from './components/Dashboard/index.jsx';
import EmployeeManagement from './components/EmployeeManagement/index.jsx';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';

export const UserContext = React.createContext();

const App = () => {

  const [authed, setAuthed] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, authed }}>
      <Router>
        <Switch>
          <Route exact path="/">
            {!authed ?
              <Login setUser={setUser} setAuthed={setAuthed}/>
              :
              <Redirect to="/dashboard/data-charts"/>
            }
          </Route>
          {/* <Route path="/log-in">
          </Route> */}
          <Route path="/dashboard">
            <Dashboard user={user} setAuthed={setAuthed}/>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );

};

export default App;
