import { loadData } from "../../utils/localStorage";
import {
  BUY_CURRENT_ITEM,
  GET_USERS_DATA,
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAILURE,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "./actionTypes";

const initState = {
  isAuth: false,
  token: loadData("token") || "",
  isLoading: false,
  isError: false,
  user: loadData("user") || "",
  cart: [],
  wishlist: [],
  buyCurrentItem: 0,
};

const reducer = (oldState = initState, { type, payload }) => {
  // console.log(oldState);
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
        token: payload.token,
        isAuth: true,
        cart: payload.cart,
        wishlist: payload.wishlist,
      };
    case USER_LOGIN_FAILURE:
      return {
        ...oldState,
        isLoading: false,
        isError: true,
        isAuth: false,
      };
    case USER_LOGOUT:
      return {
        ...oldState,
        isAuth: false,
      };
    case USER_REGISTER_REQUEST:
      return {
        ...oldState,
        isLoading: true,
        isError: false,
        isAuth: false,
      };
    case USER_REGISTER_SUCCESS:
      return {
        ...oldState,
        isLoading: false,
        isError: false,
        isAuth: true,
      };
    case USER_REGISTER_FAILURE:
      return {
        ...oldState,
        isLoading: false,
        isError: true,
        isAuth: false,
      };
    case GET_USERS_DATA:
      return {
        ...oldState,
        cart: payload.cart,
        wishlist: payload.wishlist,
      };
    case BUY_CURRENT_ITEM:
      return {
        ...oldState,
        buyCurrentItem: payload,
      };
    default:
      return oldState;
  }
};

export { reducer };
