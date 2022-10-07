import axios from "axios";
import { loadData } from "../../utils/localStorage";
import {
  GET_JEWELRY_FAILURE,
  GET_JEWELRY_REQUEST,
  GET_JEWELRY_SUCCESS,
} from "./actionTypes";

const getJewelryRequest = () => {
  return {
    type: GET_JEWELRY_REQUEST,
  };
};
const getJewelrySuccess = (payload) => {
  return {
    type: GET_JEWELRY_SUCCESS,
    payload,
  };
};
const getJewelryFailure = () => {
  return {
    type: GET_JEWELRY_FAILURE,
  };
};

const getHome = (dispatch) => {
  dispatch(getJewelryRequest());
  // const path = loadData("path");
  return axios
    .get(`http://localhost:8080/home`)
    .then((res) => {
      // console.log(res.data, "in action");
      return dispatch(getJewelrySuccess(res.data.products));
    })
    .catch((e) => dispatch(getJewelryFailure()));
};

const getJewelry = (path) => (dispatch) => {
  dispatch(getJewelryRequest());
  return axios
    .get(`http://localhost:8080/collections/${path}`)
    .then((res) => {
      return dispatch(getJewelrySuccess(res.data.products));
    })
    .catch((e) => dispatch(getJewelryFailure()));
};

export { getJewelry, getHome };
