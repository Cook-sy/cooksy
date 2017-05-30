import { combineReducers } from 'redux';
import MealsReducer from './mealsReducer';
import ActiveMealReducer from './activeMealReducer';

const rootReducer = combineReducers({
  meals: MealsReducer,
  activeMeal: ActiveMealReducer
});

export default rootReducer;
