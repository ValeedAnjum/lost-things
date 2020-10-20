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
  CssBaseline,
} from "@material-ui/core";
const useStyles = makeStyles(() => ({
  appbar: {
    backgroundColor: "transparent",
    // opacity: "0.5",
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
  tabs: {
    "& > .MuiTabs-scroller": {
      "& > .MuiTabs-flexContainer": {
        justifyContent: "center",
      },
    },
  },
}));

const pictures = [
  "https://images.pexels.com/photos/5425971/pexels-photo-5425971.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/5560026/pexels-photo-5560026.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/876466/pexels-photo-876466.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
];
const Navbar = () => {
  const classes = useStyles();
  return (
    <Fragment>
      <AppBar position="absolute" color="primary" className={classes.appbar}>
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
      <Grid container justify="center" style={{ marginTop: "10px" }}>
        <Grid item container style={{ width: "95%" }} spacing={2}>
          {[0, 1, 2, 0, 1, 2].map((num) => {
            return (
              <Grid key={num} item xs={12} sm={4}>
                <img width="100%" src={pictures[num]} />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Navbar;
