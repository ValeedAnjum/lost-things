import axios from "axios";
import { setAuthToken } from "../util/setAuthToken";

export const loadUser = () => async (dispatch) => {
  try {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      const res = await axios.get("auth/user");
      dispatch({ type: "SET_PROFILE", payload: res.data });
      dispatch({ type: "LOGIN_SUCCESS", payload: localStorage.token });
    }
  } catch (error) {
    console.log(error);
  }
};

export const signIn = ({ email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post(`/auth/signin`, body, config);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data.token });
    dispatch(loadUser());
  } catch (err) {
    console.log(err.response.data.errors);
  }
};

export const register = ({ name, email, password }) => async (dispatch) => {
  console.log(name, email, password);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ name, email, password });
  try {
    const res = await axios.post("/auth/register", body, config);
    dispatch({ type: "REGISTER_SUCCESS", payload: res.data.token });
    dispatch(loadUser());
  } catch (error) {
    console.log(error.response.data.errors);
  }
};
