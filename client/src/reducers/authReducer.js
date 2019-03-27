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
        isAuthenticated: action.payload.isAuthenticated,
        userInfo: action.payload.userInfo
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
