import axios from "axios";

export const uploadItem = (item) => async (dispatch) => {
  const {
    name,
    date,
    details,
    coordinates: { lat, lng },
    file,
    address,
  } = item;
  const configApplicationJson = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const configMultiFormData = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  try {
    const formData = new FormData();
    formData.append("file", file);
    dispatch({ type: "AsynchronousStart" });
    const imageRes = await axios.post(
      "/item/upload",
      formData,
      configMultiFormData
    );
    // console.log(imageRes.data);
    const body = JSON.stringify({
      name,
      date,
      details,
      lat,
      lng,
      file: imageRes.data,
      address,
    });
    const res = await axios.post(
      "/item/save-item",
      body,
      configApplicationJson
    );
    // console.log(res.data);
    dispatch({ type: "AsynchronousSuccess" });
    dispatch({
      type: "DispalyNotifier",
      payload: { type: "success", msg: "Item Added" },
    });
  } catch (err) {
    console.log(err.response.data.errors);
  }
};

export const fetchItems = (id, cords) => async (dispatch, getState) => {
  try {
    dispatch({ type: "FETCH_ITEMS_START" });
    // dispatch({ type: "AsynchronousStart" });
    const res = id
      ? await axios.get(`/item/get-items/4/${id}`)
      : await axios.get("/item/get-items/4");
    dispatch({ type: "FETCH_ITEM_SUCCESS", payload: res.data });
    // dispatch({ type: "AsynchronousSuccess" });
    return res.data;
  } catch (err) {
    console.log(err.response.data.errors);
  }
};

export const searchItems = (id, cords) => async (dispatch, getState) => {
  const { lat, lng } = cords;
  const preCords = getState().user.cords;
  if (id && preCords && JSON.stringify(preCords) === JSON.stringify(cords)) {
    const { lat, lng } = preCords;
    try {
      dispatch({ type: "SEARCH_ITEM_START" });
      dispatch({ type: "AsynchronousStart" });

      const res =
        id && preCords
          ? await axios.get(`/item/getitem/4/${lat}/${lng}?id=${id}`)
          : await axios.get(`/item/getitem/4/${lat}/${lng}`);
      dispatch({
        type: "SEARCH_ITEM_SUCCESS",
        payload: { items: res.data, cords: cords },
      });
      dispatch({ type: "AsynchronousSuccess" });

      return res.data;
    } catch (error) {
      console.log(error.response.data.errors);
    }
  } else {
    try {
      dispatch({ type: "CLEAN_UP" });
      dispatch({ type: "SEARCH_ITEM_START" });
      dispatch({ type: "AsynchronousStart" });
      const res = id
        ? await axios.get(`/item/getitem/4/${lat}/${lng}?id=${id}`)
        : await axios.get(`/item/getitem/4/${lat}/${lng}`);
      dispatch({
        type: "SEARCH_ITEM_SUCCESS",
        payload: { items: res.data, cords: cords },
      });
      dispatch({ type: "AsynchronousSuccess" });

      return res.data;
    } catch (error) {
      console.log(error.response.data.errors);
    }
  }
};

export const fetchProductDetails = (id) => async () => {
  try {
    const res = await axios.get(`/item/getitemdetails/${id}`);
    return res.data;
  } catch (error) {
    console.log(error.response.data.errors);
  }
};

export const uploadImage = (file) => async () => {
  // const formData = new FormData();
  // formData.append("file", file);
  // const config = {
  //   headers: {
  //     "Content-Type": "multipart/form-data",
  //   },
  // };
  // try {
  //   const res = await axios.post("/item/upload", formData, config);
  //   // console.log(res.data);
  //   return res.data;
  // } catch (error) {
  //   console.log(error);
  // }
};
