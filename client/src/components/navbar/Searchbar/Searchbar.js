import React from "react";
import { Fragment } from "react";
import Grid from "@material-ui/core/Grid";

const Searchbar = () => {
  return (
    <Fragment>
      {/* <div style={{ display: "flex" }}>
        <input
          type="text"
          placeholder="Search..."
          style={{
            outline: "none",
            border: "none",
            padding: "5px",
            height: "30px",
            width: "88%",
          }}
        />
        <button style={{ border: "none", width: "12%" }}>Find</button>
      </div> */}
      <Grid container direction="column">
        <Grid item xs={12}>
          <div style={{ display: "flex" }}>
            <input
              type="text"
              placeholder="Search..."
              style={{
                outline: "none",
                border: "none",
                padding: "5px",
                height: "30px",
                width: "88%",
              }}
            />
            <button style={{ border: "none", width: "12%" }}>Find</button>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div
            style={{
              position: "absolute",
              top: "105%",
              left: "0",
              width: "100%",
            }}
          >
            <ul
              style={{
                listStyleType: "none",
                margin: "0",
                paddingLeft: "5px",
                backgroundColor: "white",
              }}
            >
              <li style={{ fontWeight: "600", padding: "5px" }}>
                Khan Bela{" "}
                <span style={{ fontWeight: "300" }}>
                  Jalalpur Pirwala, Pakistan
                </span>
              </li>
            </ul>
            <ul
              style={{
                listStyleType: "none",
                margin: "0",
                paddingLeft: "5px",
                backgroundColor: "white",
              }}
            >
              <li style={{ fontWeight: "600", padding: "5px" }}>
                Khan Bela{" "}
                <span style={{ fontWeight: "300" }}>
                  Jalalpur Pirwala, Pakistan
                </span>
              </li>
            </ul>
          </div>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Searchbar;
