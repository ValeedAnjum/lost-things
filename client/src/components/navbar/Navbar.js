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
import SavedItems from "./SavedItems/SavedItems";
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
    backgroundImage: "url(/sources/images/navbarbackground.jpeg)",
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
  const [openDrawerUpload, setopenDrawerUpload] = useState(false);
  const [mobileMenu, setmobileMenu] = useState(false);
  const [savedItem, setsavedItem] = useState(false);
  const { auth, logout, openChatAppModel } = props;
  const { history } = props;
  const classes = useStyles();
  const openMessenger = () => {
    openChatAppModel();
  };
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
                {!auth ? (
                  <Fragment>
                    <ListItem
                      button
                      onClick={() => {
                        setopenDrawerLogin(true);
                        setmobileMenu(false);
                      }}
                    >
                      <ListItemText primary={"SIGN IN"} />
                    </ListItem>
                    <ListItem
                      button
                      onClick={() => {
                        setopenDrawerRegister(true);
                        setmobileMenu(false);
                      }}
                    >
                      <ListItemText primary={"REGISTER"} />
                    </ListItem>
                  </Fragment>
                ) : (
                  <Fragment>
                    <ListItem
                      button
                      onClick={() => {
                        setsavedItem(true);
                        setmobileMenu(false);
                      }}
                    >
                      <ListItemText primary={"SAVED ITEMS"} />
                    </ListItem>
                    <ListItem button onClick={openMessenger}>
                      <ListItemText primary={"MESSENGER"} />
                    </ListItem>
                    <ListItem
                      button
                      onClick={() => {
                        setopenDrawerUpload(true);
                        setmobileMenu(false);
                      }}
                    >
                      <ListItemText primary={"POST ITEM"} />
                    </ListItem>
                    <ListItem
                      button
                      onClick={() => {
                        logout();
                        setmobileMenu(false);
                      }}
                    >
                      <ListItemText primary={"LOGOUT"} />
                    </ListItem>
                  </Fragment>
                )}
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
          <Hidden xsDown>
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
                <Button color="inherit" onClick={() => setsavedItem(true)}>
                  Saved Items
                </Button>
                <Button color="inherit" onClick={openMessenger}>
                  Messenger
                </Button>
                <Button
                  color="inherit"
                  onClick={() => setopenDrawerUpload(true)}
                >
                  Post Lost Item
                </Button>

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
      {/* saved items drawers  */}
      <Drawer variant="temporary" anchor="top" open={savedItem}>
        <div style={{ height: "100vh" }}>
          <SavedItems setsavedItem={() => setsavedItem(false)} />
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
    openChatAppModel: () =>
      dispatch({ type: "OpenChatApp", payload: { id: "messenger" } }),
  };
};

export default connect(mapState, mapDispatch)(withRouter(Navbar));
