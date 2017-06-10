import { combineReducers } from 'redux';
import { reducer as ReduxFormReducer } from 'redux-form';

import MealReducer from './mealsReducer';
import AuthenticationReducer from './authenticationReducer';
import ReviewReducer from './reviewReducer';
<<<<<<< HEAD
import CurrentMealReducer from './CurrentMealReducer';
=======
>>>>>>> (cleanup) Remove logic for todaysMeals
import UpcomingMealReducer from './upcomingMealsReducer';

const rootReducer = combineReducers({
  meals: MealReducer,
  form: ReduxFormReducer,
  auth: AuthenticationReducer,
  review: ReviewReducer,
  upcomingMeals: UpcomingMealReducer
});

export default rootReducer;
