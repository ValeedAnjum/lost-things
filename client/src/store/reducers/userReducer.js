const initState = {
  items: [],
  loadingItems: false,
  cords: null,
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
    case "SEARCH_ITEM_START":
      return { ...state, loadingItems: true };
    case "SEARCH_ITEM_SUCCESS":
      return { ...state, loadingItems: false, items: [...payload] };
    default:
      return state;
  }
};
