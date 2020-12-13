import React, { Fragment } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { Grid } from "@material-ui/core";

const pictures = [
  "https://images.pexels.com/photos/5425971/pexels-photo-5425971.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/5560026/pexels-photo-5560026.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/876466/pexels-photo-876466.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/876466/pexels-photo-876466.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/876466/pexels-photo-876466.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/876466/pexels-photo-876466.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
];
const Items = (props) => {
  const { history } = props;
  return (
    <Fragment>
      <Grid container justify="center" style={{ marginTop: "10px" }}>
        <Grid item container style={{ width: "95%" }} spacing={2}>
          {[0, 1, 2, 3, 4, 5].map((num) => {
            return (
              <Grid key={num} item xs={12} sm={4}>
                <div
                  onClick={() => history.push(`/details/${num}`)}
                  style={{
                    width: "100%",
                    height: "300px",
                    cursor: "pointer",
                    backgroundImage: `url(${pictures[num]})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                ></div>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default withRouter(Items);
