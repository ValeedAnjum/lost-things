import React, { Fragment, useState } from "react";
import {
  AppBar,
  Toolbar,
  makeStyles,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Hidden,
  IconButton,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import { connect } from "react-redux";
import Logo from "../../Assets/Images/logo.png";
import Register from "./Register/Register";
import Signin from "./Signin/Signin";
import Searchbar from "./Searchbar/Searchbar";
import UploadItems from "./UploadItems/UploadItems";
const useStyles = makeStyles((theme) => ({
  appbar: {
    backgroundColor: "transparent",
  },
  title: {
    flexGrow: "1",
    cursor: "pointer",
  },
  searchArea: {
    height: "80vh",
    backgroundSize: "cover",
    position: "relative",
    backgroundImage: "url(./sources/images/navbarbackground.jpeg)",
  },
  searchBarContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    width: "50%",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
  },
  drawer: {
    width: "190px",
  },
  list: {
    width: "180px",
  },
}));

const Navbar = (props) => {
  const [openDrawerLogin, setopenDrawerLogin] = useState(false);
  const [openDrawerRegister, setopenDrawerRegister] = useState(false);
  const [openDrawerUpload, setopenDrawerUpload] = useState(true);
  const [mobileMenu, setmobileMenu] = useState(false);
  const { auth, logout } = props;
  const { history } = props;
  const classes = useStyles();
  return (
    <Fragment>
      <AppBar position="absolute" color="primary" className={classes.appbar}>
        <Toolbar>
          <Hidden smUp>
            <Drawer
              className={classes.drawer}
              variant="temporary"
              anchor="right"
              open={mobileMenu}
              onClose={() => setmobileMenu(false)}
            >
              <List className={classes.list}>
                <ListItem button>
                  <ListItemText
                    primary={"Sign In"}
                    onClick={() => setopenDrawerLogin(true)}
                  />
                </ListItem>
                <ListItem button>
                  <ListItemText
                    primary={"Register"}
                    onClick={() => setopenDrawerRegister(true)}
                  />
                </ListItem>
              </List>
            </Drawer>
          </Hidden>
          <div className={classes.title} onClick={() => history.push("/")}>
            <img
              src={Logo}
              alt="LPF"
              style={{ width: "150px", height: "150px" }}
            />
          </div>
          <Hidden smDown>
            <Button color="inherit" onClick={() => setopenDrawerUpload(true)}>
              Post Lost Item
            </Button>
            {!auth ? (
              <Fragment>
                <Button
                  color="inherit"
                  onClick={() => setopenDrawerRegister(true)}
                >
                  Register
                </Button>
                <Button
                  color="inherit"
                  onClick={() => setopenDrawerLogin(true)}
                >
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
          </Hidden>
          <Hidden smUp>
            <IconButton aria-label="MENU" onClick={() => setmobileMenu(true)}>
              <MenuIcon style={{ color: "white" }} />
            </IconButton>
          </Hidden>
        </Toolbar>
      </AppBar>
      <div className={classes.searchArea}>
        <div className={classes.searchBarContainer}>
          <Searchbar />
        </div>
      </div>
      {/* actual drawers  */}
      {/* login drawer  */}
      <Drawer variant="temporary" anchor="top" open={openDrawerLogin}>
        <div style={{ height: "100vh" }}>
          <Signin openDrawerLogin={() => setopenDrawerLogin(false)} />
        </div>
      </Drawer>
      {/* registration drawer  */}
      <Drawer variant="temporary" anchor="top" open={openDrawerRegister}>
        <div style={{ height: "100vh" }}>
          <Register
            setopenDrawerRegister={() => setopenDrawerRegister(false)}
          />
        </div>
      </Drawer>
      {/* upload drawers  */}
      <Drawer variant="temporary" anchor="top" open={openDrawerUpload}>
        <div style={{ height: "100vh" }}>
          <UploadItems setopenDrawerUpload={() => setopenDrawerUpload(false)} />
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

export default connect(mapState, mapDispatch)(withRouter(Navbar));
