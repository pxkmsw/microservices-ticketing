import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from '../../services/authService';

const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
  const user = auth.getCurrentUser();
  return (
    <Route
      path={path}
      render={props => {
        if (!user)
          return (
            <Redirect
              to={{
                pathname: '/Signin',
                state: { from: props.location },
              }}
            />
          );
        return Component ? <Component {...rest} {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
