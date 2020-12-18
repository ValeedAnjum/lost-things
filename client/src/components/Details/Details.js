import React from "react";
import { Fragment } from "react";
import { withRouter } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { Button } from "@material-ui/core";
const Details = (props) => {
  console.log(props.match.params.id);
  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <img
            src="/sources/images/wallet.jpg"
            alt="LPF"
            style={{
              width: "100%",
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <h1>Brown Wallet {props.match.params.id}</h1>
          <p>Rahim Yar Khan, Ada Khan Pur</p>
          <div>
            <h3>Details</h3>
            <ul>
              <li>color:black</li>
              <li>Wieght:1000 mg.</li>
            </ul>
          </div>
          <div>
            <Button variant="text" color="default">
              Contact Finder
            </Button>
          </div>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default withRouter(Details);
