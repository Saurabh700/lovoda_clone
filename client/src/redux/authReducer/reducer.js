import { loadData } from "../../utils/localStorage";
import {
  GET_USERS_DATA,
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
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
    default:
      return oldState;
  }
};

export { reducer };
