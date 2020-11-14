import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap";
import "react-notifications/lib/notifications.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "react-sortable-tree/style.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// import "bootstrap-material-design/dist/css/bootstrap-material-design.css";
import $ from "jquery";
import Popper from "popper.js";
import { Provider } from "react-redux";
import store from "./store";
import { createBrowserHistory } from "history";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

const hist = createBrowserHistory();

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Provider store={store}>
        <Route path="/" component={App} />
      </Provider>
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
