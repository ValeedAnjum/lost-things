import React from "react";
import { withRouter } from "react-router-dom";
const Details = (props) => {
  console.log(props.match.params.id);
  return <div>Detail Page</div>;
};

export default withRouter(Details);
