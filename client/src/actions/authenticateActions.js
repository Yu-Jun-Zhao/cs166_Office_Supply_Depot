import { FETCH_AUTHENTICATION, REMOVE_AUTHENTICATION } from "./types";

export const checkAuthentication = (
  auth,
  isAuthenticated,
  userInfo
) => async dispatch => {
  const authenticated = await auth.isAuthenticated();
  if (authenticated !== isAuthenticated) {
    if (authenticated && Object.keys(userInfo).length === 0) {
      const userInfo = await auth.getUser();
      dispatch(logInCurrentUser(userInfo));
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

export const logOutUser = () => {
  return {
    type: REMOVE_AUTHENTICATION
  };
};
