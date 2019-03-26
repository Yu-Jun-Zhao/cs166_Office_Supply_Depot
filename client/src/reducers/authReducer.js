import { FETCH_AUTHENTICATION, REMOVE_AUTHENTICATION } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  userInfo: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_AUTHENTICATION:
      // return the object to store
      return {
        isAuthenticated: action.isAuthenticated,
        userInfo: action.userInfo
      };
    case REMOVE_AUTHENTICATION:
      return {
        isAuthenticated: false,
        userInfo: {}
      };
    default:
      return state;
  }
}
