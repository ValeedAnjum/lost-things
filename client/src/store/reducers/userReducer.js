const initState = {
  items: [],
  loadingItems: false,
  cords: null,
  moreItems: false,
};

export const userReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "FETCH_ITEMS_START":
      return { ...state, loadingItems: true };
    case "CLEAN_UP":
      return { ...state, items: [], moreItems: false };
    case "FETCH_ITEM_SUCCESS":
      return {
        ...state,
        items: [...state.items, ...payload],
        loadingItems: false,
        moreItems: payload.length === 4,
      };
    case "SEARCH_ITEM_START":
      return { ...state, loadingItems: true };
    case "SEARCH_ITEM_SUCCESS":
      const exp = state.cords
        ? [...state.items, ...payload.items]
        : [...payload.items];
      return {
        ...state,
        loadingItems: false,
        items: exp,
        cords: payload.cords,
        moreItems: payload.items.length === 4,
      };
    case "CLEAN_FETCHED_ITEMS":
      return { ...state, items: [], cords: null };
    default:
      return state;
  }
};
