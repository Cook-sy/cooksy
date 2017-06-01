import { combineReducers } from 'redux';
import MealReducer from './mealsReducer';
import { reducer as ReduxFormReducer } from 'redux-form';
import AuthenticationReducer from './authentication_reducer';

const rootReducer = combineReducers({
  meals: MealReducer,
  form: ReduxFormReducer,
  auth: AuthenticationReducer
});

export default rootReducer;
