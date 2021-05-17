import { Avatar, Grid } from "@material-ui/core";
import React from "react";
import { Fragment } from "react";
import { connect } from "react-redux";

const Message = ({ classes, msg, currentUserId }) => {
  const isSenderMessage = currentUserId === msg.senderId;
  return (
    <Fragment>
      {!isSenderMessage ? (
        msg.type == "Text" ? (
          <Fragment>
            <Grid item container className={classes.userMessageContainer}>
              <Grid item>
                <p className={classes.userMessage}>{msg.message}</p>
              </Grid>
            </Grid>
          </Fragment>
        ) : (
          <Fragment>
            <Grid item container className={classes.userMessageContainer}>
              <Grid item>
                <img
                  src={msg.message}
                  style={{ width: "300px", height: "300px" }}
                />
              </Grid>
            </Grid>
          </Fragment>
        )
      ) : msg.type == "Text" ? (
        <Fragment>
          <Grid
            item
            container
            justify="flex-end"
            className={classes.currentUserMessageContainer}
          >
            <p className={classes.currentUserMessage}>{msg.message}</p>
          </Grid>
        </Fragment>
      ) : (
        <Fragment>
          <Grid
            item
            container
            justify="flex-end"
            className={classes.currentUserMessageContainer}
          >
            <img
              src={msg.message}
              style={{ width: "300px", height: "300px" }}
            />
          </Grid>
        </Fragment>
      )}
    </Fragment>
  );
};

const mapState = (state) => {
  return {
    currentUserId: state.auth.profile._id,
  };
};

export default connect(mapState, null)(Message);
