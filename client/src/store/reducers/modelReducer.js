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
    default:
      return { ...state };
  }
};
