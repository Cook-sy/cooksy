import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import promise from 'redux-promise';

import MealList from './containers/MealList';
import MealDetails from './containers/MealDetails';
import reducers from './reducers';
import Homepage from './containers/Homepage';
import NewMealForm from './containers/NewMealForm';
import SignUpForm from './containers/SignUpForm';
import PrivateRoute from './utils/PrivateRoute'
import LogInForm from './containers/LogInForm';
import ChefProfile from './containers/ChefProfile';
import NavBar from './containers/NavBar.js';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <BrowserRouter>
        <div>
          <div className="nav-bar">
            <NavBar />
          </div>
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/meals" component={MealList} />
            <Route exact path="/meals/:id" component={MealDetails} />
            <Route exact path="/sign-up-form" component={SignUpForm} />
            <PrivateRoute exact user='chef' path="/post-new-meal" component={NewMealForm} />
            <Route exact path="/log-in-form" component={LogInForm} />
            <Route exact path="/chef-profile" component={ChefProfile}/>
          </Switch>
        </div>
      </BrowserRouter>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
