import React, { Fragment, useState } from "react";
import { AppBar, Toolbar, makeStyles, Button, Drawer } from "@material-ui/core";
import { connect } from "react-redux";
import Register from "./Register/Register";
import Signin from "./Signin/Signin";
import Searchbar from "./Searchbar/Searchbar";
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
    position: "relative",
    backgroundImage:
      "url(https://images.pexels.com/photos/705164/computer-laptop-work-place-camera-705164.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)",
  },
  searchBarContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    width: "50%",
  },
}));

const Navbar = ({ auth, logout }) => {
  const [openDrawerLogin, setopenDrawerLogin] = useState(false);
  const [openDrawerRegister, setopenDrawerRegister] = useState(false);
  const classes = useStyles();
  return (
    <Fragment>
      <AppBar position="absolute" color="primary" className={classes.appbar}>
        <Toolbar>
          <div className={classes.title}>
            <img
              src="/logo.png"
              alt="LPF"
              style={{ width: "150px", height: "150px" }}
            />
          </div>
          <Button color="inherit">Post Lost Item</Button>
          {!auth ? (
            <Fragment>
              <Button
                color="inherit"
                onClick={() => setopenDrawerRegister(true)}
              >
                Register
              </Button>
              <Button color="inherit" onClick={() => setopenDrawerLogin(true)}>
                Login
              </Button>
            </Fragment>
          ) : (
            <Fragment>
              <Button color="inherit" onClick={logout}>
                Logout
              </Button>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
      <div className={classes.searchArea}>
        <div className={classes.searchBarContainer}>
          <Searchbar />
        </div>
      </div>

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

const mapState = (state) => {
  return {
    auth: state.auth.auth,
  };
};
const mapDispatch = (dispatch) => {
  return {
    logout: () => dispatch({ type: "CLEAR_PROFILE" }),
  };
};

export default connect(mapState, mapDispatch)(Navbar);
