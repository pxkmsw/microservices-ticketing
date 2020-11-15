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
import NewTicket from './components/NewTicket';
import EditTicket from './components/EditTicket';
import Dashboard from './components/Dashboard';
import Header from './components/Header';

import Bugs0 from './components/redux/withoutReactReduxLib/Bugs0';
import Bugs1 from './components/redux/reactReduxClass/Bugs1';
import Bugs2 from './components/redux/reactReduxFunc/Bugs2';

class App extends Component {
  render() {
    const user = getCurrentUser();

    return (
      <div className="App">
        <Header currentUser={user} />
        <Switch>
          {/* {routes.map((prop, key) => {
            return <ProtectedRoute key={key} component={prop.component} />;
          })} */}
          <Route path="/Dashboard" component={Dashboard} />
          <Route path="/Bugs" component={Bugs2} />
          <Route path="/Signin" component={Signin} />
          <Route path="/Signup" component={Signup} />
          <Route path="/Signout" component={Signout} />
          <Route path="/New-Ticket" component={NewTicket} />
          <Route path="/Edit-Ticket/:id" component={EditTicket} />
          <Redirect from="/" to="/Dashboard" />
        </Switch>
      </div>
    );
  }
}

export default App;
