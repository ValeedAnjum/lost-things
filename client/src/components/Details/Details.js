import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { Button } from "@material-ui/core";
import { fetchProductDetails } from "../../store/actions/userActions";

const Details = (props) => {
  const {
    FetchProductDetails,
    AsynchronousStartModel,
    AsynchronousSuccessModel,
    DispalyNotifierModel,
    auth,
    ClearDispalyNotifierData,
    OpenChatAppModel,
    currentUserId,
  } = props;
  const [itemInfo, setItemInfo] = useState(null);
  useEffect(() => {
    (async function () {
      AsynchronousStartModel();
      const res = await FetchProductDetails(props.match.params.id);
      AsynchronousSuccessModel();
      console.log(res.finderId);
      setItemInfo(res);
    })();
    document.getElementsByClassName("location-search-input")[0].value = "";
  }, []);
  const contactHandler = () => {
    if (!auth) {
      DispalyNotifierModel();
      setTimeout(() => ClearDispalyNotifierData(), 2000);
      return;
    }
    OpenChatAppModel(itemInfo.finderId);
  };
  return (
    <Fragment>
      {itemInfo && (
        <Grid container>
          <Grid item xs={12} sm={6}>
            <img
              src={`http://localhost:5000/${itemInfo.img}`}
              alt="LPF"
              style={{
                width: "100%",
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <h1>{itemInfo.name}</h1>
            <h3>Product id:{itemInfo._id}</h3>
            <p>{itemInfo.address}</p>
            <div>
              <h3>Details</h3>
              <ul>
                {itemInfo.details.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              {currentUserId &&
                currentUserId.profile &&
                itemInfo.finderId !== currentUserId.profile._id && (
                  <Button
                    variant="text"
                    color="default"
                    onClick={contactHandler}
                  >
                    Contact Finder
                  </Button>
                )}
            </div>
          </Grid>
        </Grid>
      )}
    </Fragment>
  );
};

const mapDispatch = (dispatch) => {
  return {
    FetchProductDetails: (id) => dispatch(fetchProductDetails(id)),
    AsynchronousStartModel: () => dispatch({ type: "AsynchronousStart" }),
    AsynchronousSuccessModel: () => dispatch({ type: "AsynchronousSuccess" }),
    DispalyNotifierModel: () =>
      dispatch({
        type: "DispalyNotifier",
        payload: { msg: "Please first login", type: "info" },
      }),
    ClearDispalyNotifierData: () =>
      dispatch({ type: "ClearDispalyNotifierData" }),
    OpenChatAppModel: (id) =>
      dispatch({ type: "OpenChatApp", payload: { id } }),
  };
};

const mapState = (state) => {
  return {
    auth: state.auth.auth,
    currentUserId: state.auth,
  };
};
export default compose(connect(mapState, mapDispatch))(withRouter(Details));
