const initState = {
  total: 0,
};

const reducer = (oldState = initState, action) => {
  switch (action.type) {
    case "ADD_TOTAL":
      return {
        ...oldState,
        total: action.payload,
      };
    default:
      return oldState;
  }
};

export { reducer };
