import axios from "axios";
import {
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
} from "./actionTypes";

const login = (payload) => (dispatch) => {
  dispatch({ type: USER_LOGIN_REQUEST });

  return axios
    .post("https://reqres.in/api/login", payload)
    .then((res) =>
      dispatch({ type: USER_LOGIN_SUCCESS, payload: res.data.token })
    )
    .catch((err) => dispatch({ type: USER_LOGIN_FAILURE }));
};

export { login };
