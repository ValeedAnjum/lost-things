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

export const fetchItems = (id) => async (dispatch) => {
  try {
    dispatch({ type: "FETCH_ITEMS_START" });
    const res = id
      ? await axios.get(`/item/get-items/4/${id}`)
      : await axios.get("/item/get-items/4");
    console.log(res.data);
    dispatch({ type: "FETCH_ITEM_SUCCESS", payload: res.data });
    return res.data;
  } catch (err) {
    console.log(err.response.data.errors);
  }
};
