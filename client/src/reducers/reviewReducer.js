import { TOGGLE_REVIEW, DID_REVIEW, DID_NOT_REVIEW } from '../actions/index';
const initialState = {
	addReview: false,
	didReview: true
}
export default function(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_REVIEW:
      return { ...state, addReview: !state.addReview };
    case DID_REVIEW:
    	return {  ...state, didReview: true };
    case DID_NOT_REVIEW:
    	return { ...state, didReview: false };
    default:
      return state;
  }
}

