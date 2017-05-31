import { combineReducers } from 'redux';
import MealReducer from './mealsReducer';
import { reducer as reduxFormReducer } from 'redux-form';

const rootReducer = combineReducers({
  meals: MealReducer,
  form: reduxFormReducer
});

export default rootReducer;
