const iniState = {
  modelName: null,
};

export const modelReducer = (state = iniState, action) => {
  const { type } = action;
  switch (type) {
    case "SingInModelOpen":
      return { ...state, modelName: "SingInModel" };
    case "SingInModelClose":
      return { ...state, modelName: null };
    case "AsynchronousStart":
      return { ...state, modelName: "AsynchronousStart" };
    case "AsynchronousSuccess":
      return { ...state, modelName: null };
    default:
      return { ...state };
  }
};
