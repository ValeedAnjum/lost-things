import axios from "axios";

export const uploadItem = (item) => async () => {
  const {
    name,
    date,
    details,
    coordinates: { lat, lng },
    file,
  } = item;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ name, date, details, lat, lng, file });
  try {
    const res = await axios.post("/item/save-item", body, config);
    console.log(res.data);
  } catch (err) {
    console.log(err.response.data.errors);
  }
};

export const fetchItems = (id, cords) => async (dispatch, getState) => {
  try {
    dispatch({ type: "FETCH_ITEMS_START" });
    const res = id
      ? await axios.get(`/item/get-items/4/${id}`)
      : await axios.get("/item/get-items/4");
    dispatch({ type: "FETCH_ITEM_SUCCESS", payload: res.data });
    return res.data;
  } catch (err) {
    console.log(err.response.data.errors);
  }
};

export const searchItems = (id, cords) => async (dispatch, getState) => {
  const { Lat, Lng } = cords;
  const preCords = getState().user.cords;
  // console.log("id", id, "pre", cords);

  if (id && preCords) {
    console.log("id", id, "pre", preCords);
    try {
      dispatch({ type: "SEARCH_ITEM_START" });
      const res =
        id && preCords
          ? await axios.get(`/item/getitem/4/1/5?id=60519b0cc9131a0dac60fc38`)
          : await axios.get(`/item/getitem/4/1/5`);
      dispatch({
        type: "SEARCH_ITEM_SUCCESS",
        payload: { items: res.data, cords: cords },
      });
      return res.data;
    } catch (error) {
      console.log(error.response.data.errors);
    }
  } else {
    try {
      dispatch({ type: "SEARCH_ITEM_START" });
      const res = id
        ? await axios.get(`/item/getitem/4/1/5?id=605199c9c9131a0dac60fc35`)
        : await axios.get(`/item/getitem/4/1/5`);
      console.log(cords);

      dispatch({
        type: "SEARCH_ITEM_SUCCESS",
        payload: { items: res.data, cords: cords },
      });
      return res.data;
    } catch (error) {
      console.log(error.response.data.errors);
    }
  }
};
