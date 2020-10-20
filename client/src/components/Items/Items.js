import React, { Fragment } from "react";
import { Tabs, Tab, Paper, Grid } from "@material-ui/core";

const pictures = [
  "https://images.pexels.com/photos/5425971/pexels-photo-5425971.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/5560026/pexels-photo-5560026.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/876466/pexels-photo-876466.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
];
const Items = () => {
  return (
    <Fragment>
      <Paper>
        <Tabs value={1} indicatorColor="primary" textColor="primary" centered>
          <Tab label="Near By" />
          <Tab label="result" />
          <Tab label="Videos" />
        </Tabs>
      </Paper>
      <Grid container justify="center" style={{ marginTop: "10px" }}>
        <Grid item container style={{ width: "95%" }} spacing={2}>
          {[0, 1, 2, 0, 1, 2].map((num) => {
            return (
              <Grid key={num} item xs={12} sm={4}>
                <img width="100%" src={pictures[num]} alt={num} />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Items;
