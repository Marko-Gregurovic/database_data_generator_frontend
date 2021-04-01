import React, { useState } from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.scss';
import 'assets/css/material-dashboard-react.css'


import Homepage from './pages/Homepage';
import Database from './pages/Database';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import AuthContextProvider, { AuthContext } from './context/auth';
import ConnectionsPage from './pages/ConnectionsPage';
import AddConnectionPage from './pages/AddConnectionPage';

function App(props) {
  const existingTokens = JSON.parse(localStorage.getItem("tokens"));
  const [authTokens, setAuthTokens] = useState(existingTokens);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);

  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  }


  return (
    <AuthContextProvider>
      <Router>
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/signup">
            <SignupPage />
          </Route>
          <PrivateRoute path="/user/database" component={Database} />
          <PrivateRoute exact path="/user/connections" component={ConnectionsPage} />
          <PrivateRoute path="/user/connections/add" component={AddConnectionPage} />
        </Switch>
      </Router>
    </AuthContextProvider>

  );
}

export default App;
