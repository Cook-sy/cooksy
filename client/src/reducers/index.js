import { combineReducers } from 'redux';
import { reducer as ReduxFormReducer } from 'redux-form';

import MealReducer from './mealsReducer';
import AuthenticationReducer from './authenticationReducer';
import ReviewReducer from './reviewReducer';
import TodaysMealReducer from './todaysMealsReducer';
import CurrentMealReducer from './CurrentMealReducer';

const rootReducer = combineReducers({
  meals: MealReducer,
  form: ReduxFormReducer,
  auth: AuthenticationReducer,
  review: ReviewReducer,
  todaysMeals: TodaysMealReducer,
  currentMeal: CurrentMealReducer
});

export default rootReducer;
