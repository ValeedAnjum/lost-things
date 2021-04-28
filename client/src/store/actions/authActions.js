import axios from "axios";
import { setAuthToken } from "../util/setAuthToken";

export const loadUser = () => async (dispatch) => {
  try {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      const res = await axios.get("/auth/user");
      dispatch({ type: "SET_PROFILE", payload: res.data });
      dispatch({ type: "LOGIN_SUCCESS", payload: localStorage.token });
      dispatch({ type: "AsynchronousSuccess" });
      dispatch({
        type: "DispalyNotifier",
        payload: { type: "success", msg: "Login successfully" },
      });
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
    dispatch({ type: "AsynchronousStart" });
    const res = await axios.post(`/auth/signin`, body, config);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data.token });
    dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: "AsynchronousError",
      payload: err.response.data.errors[0].msg,
    });
    dispatch({
      type: "DispalyNotifier",
      payload: { type: "error", msg: err.response.data.errors[0].msg },
    });
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
    dispatch({ type: "AsynchronousStart" });
    const res = await axios.post("/auth/register", body, config);
    dispatch({ type: "REGISTER_SUCCESS", payload: res.data.token });
    dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: "AsynchronousError",
      payload: err.response.data.errors[0].msg,
    });
    dispatch({
      type: "DispalyNotifier",
      payload: { type: "error", msg: err.response.data.errors[0].msg },
    });
  }
};
