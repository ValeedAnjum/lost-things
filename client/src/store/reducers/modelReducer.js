const iniState = {
  modelName: null,
  errorMessage: null,
  notifierMessage: null,
  notifierType: null,
};

export const modelReducer = (state = iniState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "SingInModelOpen":
      return { ...state, modelName: "SingInModel" };
    case "SingInModelClose":
      return { ...state, modelName: null };
    case "AsynchronousStart":
      return { ...state, modelName: "AsynchronousStart" };
    case "AsynchronousSuccess":
      return { ...state, modelName: null };
    case "AsynchronousError":
      return { ...state, modelName: null, errorMessage: payload };
    case "DispalyNotifier":
      return {
        ...state,
        modelName: "DispalyNotifier",
        notifierMessage: payload.msg,
        notifierType: payload.type,
      };
    default:
      return { ...state };
  }
};
