import {
  GET_JEWELRY_FAILURE,
  GET_JEWELRY_REQUEST,
  GET_JEWELRY_SUCCESS,
  SORT_ALPHABETICALLY_A_Z,
  SORT_PRICE_HTL,
  SORT_PRICE_LTH,
} from "./actionTypes";

const initState = {
  jewelryItems: [],
  isLoading: false,
  isError: false,
  isUpdating: true,
};

const reducer = (oldState = initState, action) => {
  switch (action.type) {
    case GET_JEWELRY_REQUEST:
      return {
        ...oldState,
        isLoading: true,
        isError: false,
      };
    case GET_JEWELRY_SUCCESS:
      return {
        ...oldState,
        isLoading: false,
        isError: false,
        jewelryItems: action.payload,
      };
    case GET_JEWELRY_FAILURE:
      return {
        ...oldState,
        isLoading: false,
        isError: true,
      };
    case SORT_PRICE_HTL:
      console.log("htl in reducer");
      return {
        ...oldState,
        jewelryItems: oldState.jewelryItems.sort((a, b) => a.cost - b.cost),
      };
    case SORT_PRICE_LTH:
      return {
        ...oldState,
        jewelryItems: oldState.jewelryItems.sort((a, b) => b.cost - a.cost),
      };
    case SORT_ALPHABETICALLY_A_Z:
      return {
        ...oldState,
        jewelryItems: oldState.jewelryItems.sort(),
      };

    default:
      return oldState;
  }
};

export { reducer };
