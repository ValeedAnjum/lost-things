import React from "react";
import { connect } from "react-redux";
import Loader from "./Loader/Loader";
const ModelManager = ({ ModelName }) => {
  switch (ModelName) {
    case "AsynchronousStart":
      return <Loader />;
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
