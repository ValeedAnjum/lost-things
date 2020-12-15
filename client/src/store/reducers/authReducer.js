const initState = {
  auth: false,
  token: null,
  profile: null,
};

export const authReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "LOGIN_SUCCESS":
    case "REGISTER_SUCCESS":
      localStorage.setItem("token", payload);
      return { ...state, auth: true, token: payload };
    case "SET_PROFILE":
      return { ...state, profile: payload };
    case "CLEAR_PROFILE":
      localStorage.removeItem("token");
      return { ...state, auth: false, token: null, profile: null };
    default:
      return state;
  }
};
