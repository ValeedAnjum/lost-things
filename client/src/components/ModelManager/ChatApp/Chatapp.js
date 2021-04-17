import { Avatar, Grid, makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";

const useStyle = makeStyles(() => {
  return {
    appContainer: {
      position: "absolute",
      width: "100%",
      height: "100vh",
      backgroundColor: "white",
      top: 0,
      left: 0,
      zIndex: 1111111,
    },
    users: {
      height: "100vh",
      border: "1px solid blue",
    },
    userMessages: {
      height: "100vh",
      border: "1px solid black",
    },
  };
});
const Chatapp = () => {
  const classes = useStyle();
  useEffect(() => {
    const body = document.getElementsByTagName("body")[0];
    body.style.overflow = "hidden";
  }, []);
  return (
    <div className={classes.appContainer}>
      <Grid container direction="row" justify="flex-start" alignItems="center">
        {/* chat users  */}
        <Grid
          item
          md={3}
          className={classes.users}
          container
          direction="column"
          justify="flex-start"
          alignItems="flex-start"
        >
          {/* a single user  */}
          <Grid item container>
            <Grid item md={2}>
              <Avatar>H</Avatar>
            </Grid>
            <Grid container direction="column" item md={10}>
              <Grid item container>
                <Grid item>user name</Grid>
                <Grid item> time</Grid>
              </Grid>
              <Grid item>last message</Grid>
            </Grid>
          </Grid>
          {/* a single user  */}
        </Grid>
        {/* chat users  */}
        {/* messages  */}
        <Grid item md={9} className={classes.userMessages}>
          <h1>messages</h1>
        </Grid>
        {/* messages  */}
      </Grid>
    </div>
  );
};

export default Chatapp;
