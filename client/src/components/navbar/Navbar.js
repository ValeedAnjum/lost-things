import React, { Fragment, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Button,
  Drawer,
} from "@material-ui/core";
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
  const [openDrawerLogin, setopenDrawerLogin] = useState(false);
  const [openDrawerRegister, setopenDrawerRegister] = useState(false);
  const classes = useStyles();
  return (
    <Fragment>
      <AppBar position="absolute" color="primary" className={classes.appbar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Lost Things
          </Typography>
          <Button color="inherit" onClick={() => setopenDrawerRegister(true)}>
            Register
          </Button>
          <Button color="inherit" onClick={() => setopenDrawerLogin(true)}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
      <div className={classes.searchArea}></div>

      <Drawer
        variant="temporary"
        anchor="top"
        open={openDrawerLogin}
        onClose={() => setopenDrawerLogin(false)}
      >
        <div
          style={{ height: "100vh" }}
          onClick={() => setopenDrawerLogin(false)}
        >
          Login
        </div>
      </Drawer>
      <Drawer
        variant="temporary"
        anchor="top"
        open={openDrawerRegister}
        onClose={() => setopenDrawerRegister(false)}
      >
        <div
          style={{ height: "100vh" }}
          onClick={() => setopenDrawerRegister(false)}
        >
          Register
        </div>
      </Drawer>
    </Fragment>
  );
};

export default Navbar;
