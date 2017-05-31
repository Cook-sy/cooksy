import { combineReducers } from 'redux';
import MealsReducer from './mealsReducer';

const rootReducer = combineReducers({
  meals: MealsReducer
});

export default rootReducer;
