import { FETCH_CHEF } from '../actions/index';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_CHEF:
      console.log(action.payload)
      return action.payload.data;
    default:
      return state;
  }
}