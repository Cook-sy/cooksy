import { combineReducers } from 'redux';
import { reducer as ReduxFormReducer } from 'redux-form';

import MealReducer from './mealsReducer';
import AuthenticationReducer from './authenticationReducer';
import ReviewReducer from './reviewReducer';
<<<<<<< HEAD
import CurrentMealReducer from './CurrentMealReducer';
import UpcomingMealReducer from './upcomingMealsReducer';
=======
import TodaysMealReducer from './todaysMealsReducer';
<<<<<<< HEAD
import CurrentMealReducer from './CurrentMealReducer';
=======
import PurchaseReducer from './purchaseReducer';
>>>>>>> (feat) Add purchase reducer
>>>>>>> (feat) Add purchase reducer

const rootReducer = combineReducers({
  meals: MealReducer,
  form: ReduxFormReducer,
  auth: AuthenticationReducer,
  review: ReviewReducer,
<<<<<<< HEAD
  currentMeal: CurrentMealReducer,
  upcomingMeals: UpcomingMealReducer
=======
  todaysMeals: TodaysMealReducer,
<<<<<<< HEAD
  currentMeal: CurrentMealReducer
=======
  purchase: PurchaseReducer
>>>>>>> (feat) Add purchase reducer
>>>>>>> (feat) Add purchase reducer
});

export default rootReducer;
