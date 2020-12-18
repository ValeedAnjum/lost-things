import React from "react";
import { connect } from "react-redux";
const ModelManager = ({ ModelName }) => {
  switch (ModelName) {
    case "AsynchronousStart":
      return <h1>Model</h1>;
    default:
      return null;
  }
};
const mapState = (state) => {
  return {
    ModelName: state.model.modelName,
  };
};
export default connect(mapState)(ModelManager);
