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

export const fetchItems = () => async (dispatch) => {
  try {
    dispatch({ type: "FETCH_ITEMS_START" });
    const res = await axios.get("/item/get-items/10");
    // console.log(res.data);
    dispatch({ type: "FETCH_ITEMS_END", payload: res.data });
  } catch (err) {
    console.log(err.response.data.errors);
  }
};
