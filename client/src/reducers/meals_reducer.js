import { CREATE_MEAL } from '../actions';

let initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_MEAL:
      return state;
    default:
      return state;
  }
}
