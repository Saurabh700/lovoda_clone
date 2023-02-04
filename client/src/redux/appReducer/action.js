import axios from "axios";
import {
  GET_JEWELRY_FAILURE,
  GET_JEWELRY_REQUEST,
  GET_JEWELRY_SUCCESS,
} from "./actionTypes";

export const getJewelryRequest = () => ({
  type: GET_JEWELRY_REQUEST,
});

export const getJewelrySuccess = (payload) => ({
  type: GET_JEWELRY_SUCCESS,
  payload,
});

export const getJewelryFailure = () => ({
  type: GET_JEWELRY_FAILURE,
});

// export const sortLowToHigh = () => ({ type: SORT_LOW_TO_HIGH });

// export const sortHighToLow = () => ({ type: SORT_HIGH_TO_LOW });

// export const nameAtoZ = () => ({ type: NAME_A_TO_Z });

// export const nameZtoA = () => ({ type: NAME_Z_TO_A });

export const getHome = (dispatch) => {
  dispatch(getJewelryRequest());
  return axios
    .get(`https://secret-beyond-36029.herokuapp.com/home`)
    .then((res) => {
      return dispatch(getJewelrySuccess(res.data.products));
    })
    .catch((e) => dispatch(getJewelryFailure()));
};

export const getJewelry = (path) => (dispatch) => {
  dispatch(getJewelryRequest());
  return axios
    .get(`https://secret-beyond-36029.herokuapp.com/collections/${path}`)
    .then((res) => {
      console.log(res, "res. in action");
      return dispatch(getJewelrySuccess(res.data.products));
    })
    .catch((e) => {
      console.log(e, "error in action");
      return dispatch(getJewelryFailure());
    });
};
