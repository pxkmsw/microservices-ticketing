import React, { Component } from 'react';
import routes from './routes';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { getCurrentUser } from './services/authService';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import './App.css';
import Signin from './components/auth/Signin';
import Signup from './components/auth/Signup';
import Signout from './components/auth/Signout';
import Tickets from './components/Tickets';
import Dashboard from './components/Dashboard';
import Header from './components/Header';

import Bugs0 from './components/redux/withoutReactReduxLib/Bugs0';
import Bugs2 from './components/redux/reactReduxFunc/Bugs2';
import Bugs1 from './components/redux/reactReduxClass/Bugs1';

class App extends Component {
  render() {
    const user = getCurrentUser();

    return (
      <div className="App">
        <Header currentUser={user} />
        <Switch>
          {routes.map(({ component, path }, key) => (
            <ProtectedRoute key={key} component={component} path={path} />
          ))}

          <Route path="/dashboard" component={Dashboard} />
          <Route path="/tickets" component={Tickets} />
          <Route path="/bugs" component={Bugs2} />
          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={Signup} />
          <Route path="/signout" component={Signout} />
          <Route path="/signout" component={Signout} />

          <Redirect from="/" to="/dashboard" />
        </Switch>
      </div>
    );
  }
}

export default App;
