const initState = {
  items: [],
  loadingItems: false,
};

export const userReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "FETCH_ITEMS_START":
      return { ...state, loadingItems: true };
    case "FETCH_ITEM_SUCCESS":
      console.log(payload);
      return {
        ...state,
        items: [...payload, ...state.items],
        loadingItems: false,
      };
    default:
      return state;
  }
};
