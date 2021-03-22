import { Grid, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => {
  return {};
});
const Item = ({ id, img, name, history }) => {
  return (
    <Grid key={id} item xs={12} sm={4}>
      <div
        onClick={() => history.push(`/details/${id}`)}
        style={{
          width: "100%",
          height: "300px",
          cursor: "pointer",
          backgroundImage: `url(http://localhost:5000/${img})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
        }}
      ></div>
    </Grid>
  );
};

export default Item;
