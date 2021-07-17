import React, { useState, useContext } from 'react';
import Login from './components/Login/index.jsx';
import Dashboard from './components/Dashboard/index.jsx';
import EmployeeManagement from './components/EmployeeManagement/index.jsx';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';

export const UserContext = React.createContext();

const App = () => {

  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Switch>
          <Route exact path="/">
              <Login setUser={setUser}/>
          </Route>
          <Route path="/dashboard">
            <Dashboard user={user}/>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );

};

export default App;
