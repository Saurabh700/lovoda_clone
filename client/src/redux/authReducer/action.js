import axios from "axios";
import { GET_USERS_DATA, REQUEST_USERS_DATA } from "./actionTypes";

const getUsersData = (payload) => (dispatch) => {
  dispatch({ type: REQUEST_USERS_DATA });
  axios
    .get(`${process.env.REACT_APP_BACKEND_BASE_URL}/usersdata/${payload}`)
    .then((res) => {
      dispatch({ type: GET_USERS_DATA, payload: res.data.user });
    })
    .catch((err) => {
      console.log(err);
    });
};

export { getUsersData };
