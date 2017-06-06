import { combineReducers } from 'redux';
import { reducer as ReduxFormReducer } from 'redux-form';

import MealReducer from './mealsReducer';
import AuthenticationReducer from './authentication_reducer';
import ReviewReducer from './reviewReducer';
import TodaysMealReducer from './todaysMealsReducer';

const rootReducer = combineReducers({
  meals: MealReducer,
  form: ReduxFormReducer,
  auth: AuthenticationReducer,
  review: ReviewReducer,
  todaysMeals: TodaysMealReducer
});

export default rootReducer;
