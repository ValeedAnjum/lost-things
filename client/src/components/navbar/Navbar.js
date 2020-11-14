import React, { Fragment, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Button,
  Drawer,
  Avatar,
} from "@material-ui/core";
import Register from "./Register/Register";
import Signin from "./Signin/Signin";
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
          {/* <Typography variant="h6" className={classes.title}>
            Lost Things Finder
          </Typography> */}
          <div className={classes.title}>
            {/* <Avatar alt="Lost Things Finder" src="./logo.png" /> */}
            <img src="./logo.png" style={{ width: "150px", height: "150px" }} />
          </div>
          <Button color="inherit" onClick={() => setopenDrawerRegister(true)}>
            Register
          </Button>
          <Button color="inherit" onClick={() => setopenDrawerLogin(true)}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
      <div className={classes.searchArea}></div>

      <Drawer variant="temporary" anchor="top" open={openDrawerLogin}>
        <div style={{ height: "100vh" }}>
          <Signin openDrawerLogin={() => setopenDrawerLogin(false)} />
        </div>
      </Drawer>
      <Drawer variant="temporary" anchor="top" open={openDrawerRegister}>
        <div style={{ height: "100vh" }}>
          <Register
            setopenDrawerRegister={() => setopenDrawerRegister(false)}
          />
        </div>
      </Drawer>
    </Fragment>
  );
};

export default Navbar;
