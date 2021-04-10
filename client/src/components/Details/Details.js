import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { Button } from "@material-ui/core";
import Wallet from "../../Assets/Images/wallet.jpg";
import { fetchProductDetails } from "../../store/actions/userActions";
const Details = (props) => {
  const { FetchProductDetails } = props;
  const [itemInfo, setItemInfo] = useState(null);
  useEffect(() => {
    (async function () {
      const res = await FetchProductDetails(props.match.params.id);
      setItemInfo(res);
    })();
  }, []);
  return (
    <Fragment>
      {itemInfo && (
        <Grid container spacing={2}>
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
              <Button variant="text" color="default">
                Contact Finder
              </Button>
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
  };
};

export default compose(connect(null, mapDispatch))(withRouter(Details));
