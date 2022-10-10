import axios from "axios";
import {
  GET_USERS_DATA,
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
} from "./actionTypes";

// const login = (payload) => (dispatch) => {
//   dispatch({ type: USER_LOGIN_REQUEST });

//   return axios
//     .post("https://reqres.in/api/login", payload)
//     .then((res) =>
//       dispatch({ type: USER_LOGIN_SUCCESS, payload: res.data.token })
//     )
//     .catch((err) => dispatch({ type: USER_LOGIN_FAILURE }));
// };

const getUsersData = (payload) => (dispatch) => {
  axios
    .get(`http://localhost:8080/usersdata/${payload}`)
    .then((res) => {
      console.log(res.data.user, "getting it again");
      dispatch({ type: GET_USERS_DATA, payload: res.data.user });
    })
    .catch((err) => {
      console.log(err);
    });
};

export { getUsersData };
