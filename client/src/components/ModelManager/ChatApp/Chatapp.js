import {
  Avatar,
  Button,
  Grid,
  Hidden,
  Icon,
  IconButton,
  Input,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import AttachFileIcon from "@material-ui/icons/AttachFile";

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
      // border: "1px solid blue",
    },
    userMessages: {
      height: "100vh",
      // border: "1px solid black",
    },
    list: {
      width: "100%",
      backgroundColor: theme.palette.background.paper,
      padding: 0,
      overflow: "auto",
      borderRight: "1px solid #dfcccc",
      "&::-webkit-scrollbar": {
        width: "0.5em",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#d4d4d4",
      },
    },
    userInfo: {
      padding: "5px",
      borderBottom: "1px solid #dfcccc",
      userSelect: "none",
    },
    messagesArea: {
      height: "75vh",
      padding: "5px",
      flexWrap: "nowrap",
      overflow: "auto",
      "&::-webkit-scrollbar": {
        width: "0.5em",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#d4d4d4",
      },
    },
    messageTypingArea: {
      borderTop: " 1px solid #dfcccc",
    },
    messageTypingInnerArea: {
      margin: "15px 0",
    },
    userMessageContainer: {
      marginBottom: "5px",
    },
    userMessage: {
      backgroundColor: "#ccccc0",
      margin: "0",
      padding: "5px 5px",
      borderRadius: "8px 8px 8px 0px",
      marginLeft: "5px",
      maxWidth: "500px",
    },
    currentUserMessageContainer: {
      marginBottom: "5px",
    },
    currentUserMessage: {
      backgroundColor: "#ccccc0",
      margin: "0",
      padding: "5px 5px",
      borderRadius: "8px 8px 0px 8px",
      maxWidth: "500px",
      marginRight: "5px",
    },
    messageTypingInput: {
      outline: "none",
      border: "1px solid #bcb8b8",
      width: "100%",
      resize: "none",
      height: "87%",
      // "&::-webkit-scrollbar": {
      //   width: "0.5em",
      // },
      // "&::-webkit-scrollbar-thumb": {
      //   backgroundColor: "#d4d4d4",
      // },
    },
    messgaeSendButton: {
      outline: "none",
      border: "1px solid #bcb8b8",
      height: "100%",
      cursor: "pointer",
    },
  };
});
const Chatapp = () => {
  const classes = useStyle();
  useEffect(() => {
    const body = document.getElementsByTagName("body")[0];
    body.style.overflow = "hidden";
    console.log("c");
  }, []);
  return (
    <div className={classes.appContainer}>
      <Grid container direction="row" justify="flex-start" alignItems="center">
        <Hidden smDown>
          {/* chat users  */}
          <Grid
            item
            sm={2}
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
        </Hidden>
        {/* chat users  */}
        {/* chat content area  */}
        <Grid item sm={10} xs={12} className={classes.userMessages}>
          {/* user info and delete chat button  */}
          <Grid
            container
            justify="space-between"
            alignItems="center"
            className={classes.userInfo}
          >
            <Grid item>
              <Typography variant="h4">Valeed Anjum</Typography>
            </Grid>
            <Grid item>
              <IconButton>
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
          {/* user info and delete chat button  */}
          {/* messages conatiner  */}
          <Grid className={classes.messagesArea}>
            {/* user message  */}
            <Grid item container className={classes.userMessageContainer}>
              <Grid item>
                <Avatar>U</Avatar>
              </Grid>
              <Grid item>
                <p className={classes.userMessage}>
                  hello how are you i am a user message what about you hello how
                </p>
              </Grid>
            </Grid>
            {/* user message  */}
            {/* current user message  */}
            <Grid
              item
              container
              justify="flex-end"
              className={classes.currentUserMessageContainer}
            >
              <p className={classes.currentUserMessage}>
                hey i am fine i am a message from where i dont know
              </p>
            </Grid>
            {/* current user message  */}
          </Grid>
          <Grid
            container
            justify="center"
            className={classes.messageTypingArea}
          >
            <Grid
              item
              container
              justify="center"
              alignItems="stretch"
              className={classes.messageTypingInnerArea}
            >
              <Grid item container justify="center" xs={1}>
                <IconButton>
                  <AttachFileIcon />
                </IconButton>
              </Grid>
              <Grid item xs={10}>
                <textarea className={classes.messageTypingInput}></textarea>
              </Grid>
              <Grid item xs={1}>
                <button className={classes.messgaeSendButton}>SEND</button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* chat content area  */}
      </Grid>
    </div>
  );
};

export default Chatapp;
