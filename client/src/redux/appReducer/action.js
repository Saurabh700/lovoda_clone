import axios from "axios";
import {
  GET_MUSIC_RECORD_FAILURE,
  GET_MUSIC_RECORD_REQUEST,
  GET_MUSIC_RECORD_SUCCESS,
  UPDATE_MUSIC_RECORD_FAILURE,
  UPDATE_MUSIC_RECORD_REQUEST,
  UPDATE_MUSIC_RECORD_SUCCESS,
} from "./actionTypes";

// METHOD 1
// const getMusicRecord = (dispatch) => {
//   dispatch({ type: GET_MUSIC_RECORD_REQUEST });
//   axios
//     .get("http://localhost:8080/albums")
//     .then((res) => {
//       return dispatch({
//         type: GET_MUSIC_RECORD_SUCCESS,
//         payload: res.data,
//       });
//     })
//     .catch((e) => dispatch({ type: GET_MUSIC_RECORD_FAILURE }));
// };

// METHOD 2
const getMusicRecord = (queryParams) => (dispatch) => {
  dispatch({ type: GET_MUSIC_RECORD_REQUEST });
  return axios
    .get("http://localhost:8080/albums", queryParams)
    .then((res) => {
      return dispatch({
        type: GET_MUSIC_RECORD_SUCCESS,
        payload: res.data,
      });
    })
    .catch((e) => dispatch({ type: GET_MUSIC_RECORD_FAILURE }));
};

const updateMusicRecord = (id, payload) => (dispatch) => {
  dispatch({ type: UPDATE_MUSIC_RECORD_REQUEST });
  return axios
    .patch(`http://localhost:8080/albums/${id}`, payload)
    .then((r) => dispatch({ type: UPDATE_MUSIC_RECORD_SUCCESS }))
    .catch((err) => dispatch({ type: UPDATE_MUSIC_RECORD_FAILURE }));
};

export { getMusicRecord, updateMusicRecord };
