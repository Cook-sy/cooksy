import { combineReducers } from 'redux';
import { reducer as ReduxFormReducer } from 'redux-form';

import MealReducer from './mealsReducer';
import AuthenticationReducer from './authenticationReducer';
import ReviewReducer from './reviewReducer';
import UpcomingMealReducer from './upcomingMealsReducer';
import CurrentMealReducer from './CurrentMealReducer';
import PurchaseReducer from './purchaseReducer';

const rootReducer = combineReducers({
  meals: MealReducer,
  form: ReduxFormReducer,
  auth: AuthenticationReducer,
  review: ReviewReducer,
  currentMeal: CurrentMealReducer,
  upcomingMeals: UpcomingMealReducer
  purchase: PurchaseReducer
});

export default rootReducer;
