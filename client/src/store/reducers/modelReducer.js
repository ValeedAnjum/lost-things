const iniState = {
  modelName: null,
};

export const modelReducer = (state = iniState, action) => {
  const { type, payload } = action;
  console.log(type);
  switch (type) {
    case "SingInModelOpen":
      return { ...state, modelName: "SingInModel" };
    case "SingInModelClose":
      return { ...state, modelName: null };
    default:
      return { ...state };
  }
};
