import {
  GET_MUSIC_RECORD_FAILURE,
  GET_MUSIC_RECORD_REQUEST,
  GET_MUSIC_RECORD_SUCCESS,
  UPDATE_MUSIC_RECORD_REQUEST,
} from "./actionTypes";

const initState = {
  musicRecords: [],
  isLoading: false,
  isError: false,
  isUpdating: true,
};

const reducer = (oldState = initState, action) => {
  switch (action.type) {
    case GET_MUSIC_RECORD_REQUEST:
      return {
        ...oldState,
        isLoading: true,
        isError: false,
      };
    case GET_MUSIC_RECORD_SUCCESS:
      return {
        ...oldState,
        isLoading: false,
        isError: false,
        musicRecords: action.payload,
        // payload is already an array and everytime we will get a response from api then this payload will be a new array everytime --> thats why there is no need to use spread operator here to change the reference
      };
    case GET_MUSIC_RECORD_FAILURE:
      return {
        ...oldState,
        isLoading: false,
        isError: true,
      };
    case UPDATE_MUSIC_RECORD_REQUEST:
      return {
        ...oldState,
        isUpdating: true,
      };
    default:
      return oldState;
  }
};

export { reducer };
