import { TOGGLE_REVIEW } from '../actions/index';
const initialState = {
	addReview: false
}
export default function(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_REVIEW:
      return { ...state, addReview: !state.addReview };
    default:
      return state;
  }
}

