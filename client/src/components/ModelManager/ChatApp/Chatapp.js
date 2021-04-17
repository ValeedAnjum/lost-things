import {
  Avatar,
  Grid,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

import React, { useEffect } from "react";

const useStyle = makeStyles((theme) => {
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
    list: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
      padding: 0,
      overflow: "auto",
      "&::-webkit-scrollbar": {
        width: "0.5em",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#d4d4d4",
      },
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
          <List className={classes.list}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((index) => {
              return (
                <ListItem button key={index}>
                  <ListItemAvatar>
                    <Avatar>H</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Valeed Anjum"
                    secondary={`I am message ${index}`}
                  />
                </ListItem>
              );
            })}
          </List>
          {/* a single user  */}
        </Grid>
        {/* chat users  */}
        {/* chat content area  */}
        <Grid item md={9} className={classes.userMessages}>
          {/* user info and delete chat button  */}
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h4" button>
                Valeed Anjum
              </Typography>
            </Grid>
            <Grid item>
              <IconButton>
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
          {/* user info and delete chat button  */}
        </Grid>
        {/* chat content area  */}
      </Grid>
    </div>
  );
};

export default Chatapp;
