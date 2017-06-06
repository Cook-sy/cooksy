import { FETCH_MEALS, FETCH_MEALDETAIL, CREATE_MEAL, REVIEW_MEAL, FETCH_MEALS_BY_CHEF } from '../actions/index';
import _ from 'lodash';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_MEALDETAIL:
      return { ...state, [action.payload.data.meal.id]: action.payload.data.meal };
    case FETCH_MEALS:
      return _.mapKeys(action.payload.data, 'id');
    case FETCH_MEALS_BY_CHEF:
      return _.pickBy(action.payload.data, (x)=> x.chefId === 1);
    case CREATE_MEAL:
      return { ...state, [action.payload.data.meal.id]: action.payload.data.meal };
    case REVIEW_MEAL:
      const id = Object.keys(state)[0];
      const newState = { ...state };
      newState[id].mealReviews = [...state[id].mealReviews, action.payload.data.review];
      return newState;
    default:
      return state;
  }
}

