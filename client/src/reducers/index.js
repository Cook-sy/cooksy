import { combineReducers } from 'redux';
import { reducer as ReduxFormReducer } from 'redux-form';

import MealReducer from './mealsReducer';
import AuthenticationReducer from './authenticationReducer';
import ReviewReducer from './reviewReducer';
import TodaysMealReducer from './todaysMealsReducer';
import CurrentMealReducer from './CurrentMealReducer';
import TomorrowsMealReducer from './tomorrowsMealsReducer';

const rootReducer = combineReducers({
  meals: MealReducer,
  form: ReduxFormReducer,
  auth: AuthenticationReducer,
  review: ReviewReducer,
  todaysMeals: TodaysMealReducer,
  tomorrowsMeals: TomorrowsMealReducer
});

export default rootReducer;
