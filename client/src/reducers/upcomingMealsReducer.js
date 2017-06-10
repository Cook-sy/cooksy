import { FETCH_UPCOMING_MEALS } from '../actions/mealsActions';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_UPCOMING_MEALS:
      return action.payload;
    default:
      return state;
  }
};