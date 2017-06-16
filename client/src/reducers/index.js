import { combineReducers } from 'redux';
import { reducer as ReduxFormReducer } from 'redux-form';

import AuthenticationReducer from './authenticationReducer';
import UpcomingMealReducer from './upcomingMealsReducer';
import CurrentMealReducer from './CurrentMealReducer';
import PurchaseReducer from './purchaseReducer';
import RequestReducer from './RequestReducer';
import ReviewReducer from './reviewReducer';
import MealReducer from './mealsReducer';
import ChefReducer from './chefReducer';

const rootReducer = combineReducers({
  meals: MealReducer,
  form: ReduxFormReducer,
  auth: AuthenticationReducer,
  review: ReviewReducer,
  upcomingMeals: UpcomingMealReducer,
  currentMeal: CurrentMealReducer,
  purchase: PurchaseReducer,
  requests: RequestReducer,
  chef: ChefReducer
});

export default rootReducer;
