import { SIGN_UP_USER, SIGN_UP_CHEF, LOG_IN_USER, LOG_IN_CHEF } from '../actions';

let initialState = {
  auth: {
    isLoggedIn: false,
    role: false
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SIGN_UP_USER:
      return {
        auth: {
          isLoggedIn: true,
          role: 'user'
        }
      };
    case SIGN_UP_CHEF:
      return {
        auth: {
          isLoggedIn: true,
          role: 'chef'
        }
      };
    case LOG_IN_USER:
      return {
        auth: {
          isLoggedIn: true,
          role: 'user'
        }
      };
    case LOG_IN_CHEF:
      return {
        auth: {
          isLoggedIn: true,
          role: 'chef'
        }
      };
    default:
      return state;
  }
}
