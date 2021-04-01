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

export const searchItems = (cords) => async (dispatch, getState) => {
  console.log(getState());
  // const { Lat, Lng } = cords;
  // try {
  //   dispatch({ type: "SEARCH_ITEM_START" });
  //   const res = id
  //     ? await axios.get(`/item/getitem/4/1/5?id=605199c9c9131a0dac60fc35`)
  //     : await axios.get(`/item/getitem/4/1/5`);
  //   dispatch({ type: "SEARCH_ITEM_SUCCESS", payload: res.data });
  // } catch (error) {
  //   console.log(error.response.data.errors);
  // }
};
