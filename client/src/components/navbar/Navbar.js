import React, { Fragment } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Button,
  Tabs,
  Tab,
  Paper,
  Grid,
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
      "url(https://images.pexels.com/photos/592753/pexels-photo-592753.jpeg?cs=srgb&dl=pexels-aaditya-arora-592753.jpg&fm=jpg)",
  },
  tabs: {
    "& > .MuiTabs-scroller": {
      "& > .MuiTabs-flexContainer": {
        justifyContent: "center",
      },
    },
  },
}));
const Navbar = () => {
  const classes = useStyles();
  return (
    <Fragment>
      <AppBar position="fixed" color="primary" className={classes.appbar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Lost Things
          </Typography>
          <Button color="inherit">Register</Button>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <div className={classes.searchArea}></div>
      <Paper>
        <Tabs value={1} indicatorColor="primary" textColor="primary" centered>
          <Tab label="Near By" />
          <Tab label="result" />
          <Tab label="Videos" />
        </Tabs>
      </Paper>
      <Grid container>
        <Grid item xs={12} sm={4}>
          <div>
            <img src="https://images.pexels.com/photos/592753/pexels-photo-592753.jpeg?cs=srgb&dl=pexels-aaditya-arora-592753.jpg&fm=jpg" />
          </div>
        </Grid>
        <Grid item xs={12} sm={4}>
          <div>
            <img src="https://images.pexels.com/photos/592753/pexels-photo-592753.jpeg?cs=srgb&dl=pexels-aaditya-arora-592753.jpg&fm=jpg" />
          </div>
        </Grid>
        <Grid item xs={12} sm={4}>
          <div>
            <img src="https://images.pexels.com/photos/592753/pexels-photo-592753.jpeg?cs=srgb&dl=pexels-aaditya-arora-592753.jpg&fm=jpg" />
          </div>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Navbar;
