import React from "react";
import { connect } from "react-redux";
import Chatapp from "./ChatApp/Chatapp";
import Loader from "./Loader/Loader";
import Notifier from "./Notifier/Notifier";
const ModelManager = ({ ModelName, NotifierMessage, NotifierType }) => {
  switch (ModelName) {
    case "AsynchronousStart":
      return <Loader />;
    case "DispalyNotifier":
      return <Notifier message={NotifierMessage} type={NotifierType} />;
    case "OpenChatApp":
      return <Chatapp />;
    default:
      return null;
  }
};
const mapState = (state) => {
  return {
    ModelName: state.model.modelName,
    NotifierMessage: state.model.notifierMessage,
    NotifierType: state.model.notifierType,
  };
};
export default connect(mapState)(ModelManager);
