import React, { Component } from "react";
import InActive from "./inActive";
import { Route, Redirect } from "react-router-dom";
import auth from "../services/authService";

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
                pathname: "/Login",
                state: { from: props.location }
              }}
            />
          );
        if (!user.isActive) return <InActive user={user} />;
        return Component ? <Component {...rest} {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
