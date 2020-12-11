import React, { Fragment, useState } from "react";
import { AppBar, Toolbar, makeStyles, Button, Drawer } from "@material-ui/core";
const useStyles = makeStyles(() => ({
  appbar: {
    backgroundColor: "transparent",
  },
  title: {
    flexGrow: "1",
  },
  searchArea: {
    height: "80vh",
    backgroundSize: "cover",
    backgroundImage:
      "url(https://images.pexels.com/photos/705164/computer-laptop-work-place-camera-705164.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)",
  },
}));

const Navbar = () => {
  const classes = useStyles();
  return (
    <Fragment>
      <AppBar position="absolute" color="primary" className={classes.appbar}>
        <Toolbar>
          <div className={classes.title}>
            <img src="/logo.png" style={{ width: "100px", height: "100px" }} />
          </div>
          <Button color="inherit">Register</Button>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <div className={classes.searchArea}></div>
    </Fragment>
  );
};

export default Navbar;
