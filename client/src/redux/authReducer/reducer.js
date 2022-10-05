import {
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
} from "./actionTypes";

const initState = {
  isAuth: false,
  token: "",
  isLoading: false,
  isError: false,
};

const reducer = (oldState = initState, { type, payload }) => {
  console.log(oldState);
  switch (type) {
    case USER_LOGIN_REQUEST:
      return {
        ...oldState,
        isLoading: true,
        isError: false,
        isAuth: false,
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...oldState,
        isLoading: false,
        isError: false,
        token: payload,
        isAuth: true,
      };
    case USER_LOGIN_FAILURE:
      return {
        ...oldState,
        isLoading: false,
        isError: true,
        isAuth: false,
      };
    default:
      return oldState;
  }
};

export { reducer };
