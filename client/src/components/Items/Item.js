import { Grid, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles(() => {
  return {
    parrent: {
      position: "relative",
      border: "1px solid #e7e3e3",
      width: "100%",
      height: "300px",
      cursor: "pointer",
      "&:hover": {
        "& $overlay": {
          opacity: "1",
        },
      },
    },
    overlay: {
      position: "absolute",
      bottom: "0",
      background: "rgba(0, 0, 0, 0.5)",
      width: "100%",
      transition: ".5s ease",
      opacity: "0",
      color: "white",
      fontSize: "20px",
      "& p": {
        margin: "0",
        fontSize: "medium",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
      },
      "& p:nth-child(1)": {
        width: "170px",
      },
      "& p:nth-child(2)": {
        width: "270px",
      },
    },
  };
});
const Item = ({ id, img, name, history, address }) => {
  const classes = useStyles();
  return (
    <Grid key={id} item xs={12} sm={4}>
      <div
        onClick={() => history.push(`/details/${id}`)}
        className={classes.parrent}
        style={{
          backgroundImage: `url(http://localhost:5000/${img})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundPosition: "center",
        }}
      >
        <div className={classes.overlay}>
          <p>{name}</p>
          <p>{address}</p>
        </div>
      </div>
    </Grid>
  );
};

export default Item;
