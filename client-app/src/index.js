import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './App.js';
import 'bootstrap/dist/css/bootstrap.css';
import configureStore from './store/configureStore';
import StoreContext from './contexts/storeContext';
import { Provider } from 'react-redux';

const store = configureStore();

// 00 - Using react context
// return (
//   <StoreContext.Provider value={store}>
//     <Bugs0 />
//   </StoreContext.Provider>
// );

// 01 - Using react-redux lib

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Provider store={store}>
        <Route path="/" component={App} />
      </Provider>
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
