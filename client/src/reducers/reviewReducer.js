import {
  TOGGLE_REVIEW,
  DID_REVIEW,
  DID_NOT_REVIEW,
  CAN_NOT_REVIEW,
  FETCH_MEALDETAIL,
  REVIEW_MEAL
} from '../actions/index';

const initialState = {
  addReview: false,
  didReview: true,
  currentReviews: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_REVIEW:
      return { ...state, addReview: !state.addReview };
    case DID_REVIEW:
      return { ...state, didReview: true };
    case DID_NOT_REVIEW:
      return { ...state, didReview: false };
    case CAN_NOT_REVIEW:
      return { ...state, didReview: true };
    case FETCH_MEALDETAIL:
      return { ...state, currentReviews: action.payload.data.meal.mealReviews };
    case REVIEW_MEAL:
      return {
        ...state,
        currentReviews: [...state.currentReviews, action.payload.data.review]
      };
    default:
      return state;
  }
}
