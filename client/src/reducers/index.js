import { combineReducers } from 'redux';
import { reducer as ReduxFormReducer } from 'redux-form';

import MealReducer from './mealsReducer';
import AuthenticationReducer from './authentication_reducer';

const rootReducer = combineReducers({
  meals: MealReducer,
  form: ReduxFormReducer,
  auth: AuthenticationReducer
});

export default rootReducer;
