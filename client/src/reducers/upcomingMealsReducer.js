import { FETCH_UPCOMING_MEALS, FETCH_ORDERED_MEALS_BY_CHEF } from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_UPCOMING_MEALS:
      return action.payload;
    case FETCH_ORDERED_MEALS_BY_CHEF:
      return action.payload;
    default:
      return state;
  }
};