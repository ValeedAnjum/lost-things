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
      return {
        ...state,
        items: [...state.items, ...payload],
        loadingItems: false,
      };
    default:
      return state;
  }
};
