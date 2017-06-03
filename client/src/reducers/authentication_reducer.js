import { AUTHENTICATE } from '../actions';

let initialState = {
  error: ''
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATE:
      if (action.error) {
        return {
          error: action.payload.response.data.message
        };
      } else {
        return {
          error: ''
        };
      }
    default:
      return state;
  }
}
