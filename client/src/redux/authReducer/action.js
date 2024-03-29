import axios from "axios";
import { GET_USERS_DATA, REQUEST_USERS_DATA } from "./actionTypes";

const getUsersData = (payload) => (dispatch) => {
  dispatch({ type: REQUEST_USERS_DATA });
  axios
    .get(`https://lovoda-clone-eta.vercel.app/usersdata/${payload}`)
    .then((res) => {
      console.log(res.data.user, "getting it again");
      dispatch({ type: GET_USERS_DATA, payload: res.data.user });
    })
    .catch((err) => {
      console.log(err);
    });
};

export { getUsersData };
