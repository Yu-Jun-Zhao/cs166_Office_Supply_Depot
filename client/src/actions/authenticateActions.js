import {
  FETCH_AUTHENTICATION,
  REMOVE_AUTHENTICATION,
  GET_AUTH_ERRORS,
  REMOVE_AUTH_ERRORS
} from "./types";
import setAuthHeader from "../utils/setAuthHeader";
import axios from "axios";

// check user authentication with okta
// put userdata to database
export const checkAuthentication = (
  auth,
  isAuthenticated,
  userInfo
) => async dispatch => {
  const authenticated = await auth.isAuthenticated();
  if (authenticated !== isAuthenticated) {
    if (authenticated && Object.keys(userInfo).length === 0) {
      const userInfo = await auth.getUser();
      const accessToken = await auth.getAccessToken();

      // set auth header
      setAuthHeader(`Bearer ${accessToken}`);

      const names = userInfo.name.split(" ");

      const db_userData = {
        userId: userInfo.sub,
        firstName: names[0],
        lastName: names[1]
      };

      axios
        .put("/api/user/", db_userData)
        .then(res => {
          dispatch(logInCurrentUser(userInfo));
        })
        .catch(err =>
          dispatch({
            type: GET_AUTH_ERRORS,
            payload: err
          })
        );
    }
  }
};

export const logInCurrentUser = userInfo => {
  return {
    type: FETCH_AUTHENTICATION,
    payload: {
      isAuthenticated: true,
      userInfo: userInfo
    }
  };
};

export const logOutUser = () => dispatch => {
  // remove the bearer token
  setAuthHeader(false);

  dispatch({ type: REMOVE_AUTH_ERRORS });
  dispatch({
    type: REMOVE_AUTHENTICATION
  });
};
