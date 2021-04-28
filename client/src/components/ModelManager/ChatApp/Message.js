import { Avatar, Grid } from "@material-ui/core";
import React from "react";

const Message = ({ classes }) => {
  return (
    <Grid item container className={classes.userMessageContainer}>
      <Grid item>
        <p className={classes.userMessage}>
          hello how are you i am a user message what about you hello how
        </p>
      </Grid>
    </Grid>
  );
};

export default Message;
