import { Button, Grid } from "@material-ui/core";
import React from "react";
import { Fragment } from "react";

const SingleItem = ({
  item: { img, name, address, details, _id },
  deleteItem,
}) => {
  return (
    <Fragment>
      <Grid item sm={6}>
        <img
          src={`http://localhost:5000/${img}`}
          alt="LPF"
          style={{
            width: "100%",
          }}
        />
      </Grid>
      <Grid item sm={6}>
        <h1>{name}</h1>
        <p>{address}</p>
        <div>
          <h3>Details</h3>
          <ul style={{ textTransform: "capitalize" }}>
            {details.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <Button
            variant="text"
            onClick={() => deleteItem(_id)}
            color="default"
          >
            Delete
          </Button>
        </div>
      </Grid>
    </Fragment>
  );
};

export default SingleItem;
