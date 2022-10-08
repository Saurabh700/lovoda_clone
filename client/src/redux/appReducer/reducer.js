import {
  GET_JEWELRY_FAILURE,
  GET_JEWELRY_REQUEST,
  GET_JEWELRY_SUCCESS,
  NAME_A_TO_Z,
  NAME_Z_TO_A,
  SORT_HIGH_TO_LOW,
  SORT_LOW_TO_HIGH,
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
    case SORT_LOW_TO_HIGH:
      console.log("in reducer");
      console.log(oldState);
      return {
        ...oldState,
        jewelryItems: oldState.jewelryItems.sort((a, b) => a.cost - b.cost),
      };
    case SORT_HIGH_TO_LOW:
      console.log(oldState, "htl");
      return {
        ...oldState,
        jewelryItems: oldState.jewelryItems.sort((a, b) => b.cost - a.cost),
      };
    case NAME_A_TO_Z:
      return {
        ...oldState,
        jewelryItems: oldState.jewelryItems.sort((a, b) =>
          a.title.localeCompare(b.title)
        ),
      };
    case NAME_Z_TO_A:
      return {
        ...oldState,
        jewelryItems: oldState.jewelryItems.sort((a, b) =>
          b.title.localeCompare(a.title)
        ),
      };
    default:
      return oldState;
  }
};

export { reducer };
