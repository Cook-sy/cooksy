import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MealList from './containers/mealList';
import MealDetail from './containers/mealDetail';

import reducers from './reducers';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/meals" component={MealList} />
          <Route exact path="/meal" component={MealDetail} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
