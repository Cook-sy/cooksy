import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import promise from 'redux-promise';
import MealList from './containers/mealList';
import MealDetails from './containers/mealDetails';

import reducers from './reducers';
import App from './components/App';
import NewMealForm from './containers/NewMealForm';
import registerServiceWorker from './registerServiceWorker';
import './index.css';


const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/post-new-meal" component={NewMealForm} />
            <Route exact path="/meals" component={MealList} />
            <Route exact path="/meals/:id" component={MealDetails} />
            <Route exact path="/" component={App} />
          </Switch>
        </div>
      </BrowserRouter>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
