import { combineReducers } from 'redux';
import { reducer as ReduxFormReducer } from 'redux-form';

import MealReducer from './mealsReducer';
import AuthenticationReducer from './authenticationReducer';
import ReviewReducer from './reviewReducer';
import CurrentMealReducer from './CurrentMealReducer';
import UpcomingMealReducer from './upcomingMealsReducer';

const rootReducer = combineReducers({
  meals: MealReducer,
  form: ReduxFormReducer,
  auth: AuthenticationReducer,
  review: ReviewReducer,
  upcomingMeals: UpcomingMealReducer
});

export default rootReducer;
