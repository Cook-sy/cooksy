import { combineReducers } from 'redux';
import MealReducer from './meals_reducer';
import { reducer as reduxFormReducer } from 'redux-form'

const rootReducer = combineReducers({
  meals: MealReducer,
  form: reduxFormReducer
});

export default rootReducer;
