import {
  Avatar,
  Grid,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import ClearIcon from "@material-ui/icons/Clear";
import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Message from "./Message";
import axios from "axios";
import Messages from "./Messages";

let socket;
const useStyle = makeStyles((theme) => {
  return {
    appContainer: {
      position: "fixed",
      width: "100%",
      height: "100vh",
      backgroundColor: "white",
      top: 0,
      left: 0,
      zIndex: 1111111,
    },
    users: {
      height: "100vh",
      borderRight: "1px solid #dfcccc",
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
      "&::-webkit-scrollbar": {
        width: "0.5em",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#d4d4d4",
      },
    },
    noConversations: {
      textAlign: "center",
      textTransform: "capitalize",
      width: "100%",
    },
    messengerIsEmpty: {
      textTransform: "capitalize",
      textAlign: "center",
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
      lineBreak: "anywhere",
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
      lineBreak: "anywhere",
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
const Chatapp = (props) => {
  const [itemFinderUser, setItemFinderUser] = useState(null);
  const [chatUsers, setChatUsers] = useState([]);
  const [loadedChatInfo, setLoadedChatInfo] = useState({
    id: null,
    name: null,
  });
  const [messages, setMessages] = useState(null);
  const [textAriaMessage, setTextAriaMessage] = useState("");
  const [noConversation, setnoConversation] = useState(false);
  const [receiverId, setReceiverId] = useState(null);
  const ENDPOINT = "http://localhost:5000";

  const classes = useStyle();
  const { ClearAllModels, itemFinderId, currentUserId } = props;
  useEffect(() => {
    const body = document.getElementsByTagName("body")[0];
    body.style.overflow = "hidden";
    if (itemFinderId) {
      const textArea = document.getElementById("textArea");
      textArea.focus();
      // console.log("IF_ID", itemFinderId);
      // console.log("CU_ID", currentUserId);
      (async function () {
        if (itemFinderId !== "messenger") {
          const res = await axios.get(`/auth/userinfo/${itemFinderId}`);
          const messages = await axios.get(
            `/auth/chat/${itemFinderId}/${currentUserId}`
          );
          const chatUsersIds = await axios.get("/auth/chatusers");
          const chatUserProfiles = [];
          for (let i = 0; i < chatUsersIds.data.length; i++) {
            if (itemFinderId !== chatUsersIds.data[i]) {
              const chatUserProfileRes = await axios.get(
                `/auth/userinfo/${chatUsersIds.data[i]}`
              );
              chatUserProfiles.push(chatUserProfileRes.data);
            }
          }
          setChatUsers(chatUserProfiles);
          setLoadedChatInfo({ id: itemFinderId, name: res.data.name });
          setReceiverId(itemFinderId);
          setMessages(messages.data);
          setItemFinderUser(res.data);
        } else {
          const chatUsersIds = await axios.get("/auth/chatusers");
          if (chatUsersIds.data.length > 0) {
            const chatUserProfiles = [];
            for (let i = 0; i < chatUsersIds.data.length; i++) {
              if (itemFinderId !== chatUsersIds.data[i]) {
                const chatUserProfileRes = await axios.get(
                  `/auth/userinfo/${chatUsersIds.data[i]}`
                );
                chatUserProfiles.push(chatUserProfileRes.data);
              }
            }
            const messages = await axios.get(
              `/auth/chat/${chatUserProfiles[0]._id}/${currentUserId}`
            );

            setReceiverId(chatUserProfiles[0]._id);
            setChatUsers(chatUserProfiles);
            setLoadedChatInfo({
              id: chatUserProfiles[0]._id,
              name: chatUserProfiles[0].name,
            });
            setMessages(messages.data);
          } else {
            setnoConversation(true);
          }
        }
      })();
    }
    return () => {
      body.style.overflow = "auto";
    };
  }, []);
  const textareaMessageHandler = (event) => {
    const newValue = event.target.value;
    if (newValue.charCodeAt(newValue.length - 1) === 10) {
      return sendMessage();
    }
    setTextAriaMessage(event.target.value);
  };
  const sendMessage = async () => {
    const textmessage = textAriaMessage.trim();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (textmessage) {
      try {
        const body = JSON.stringify({ message: textmessage, type: "Text" });
        const msg = await axios.post(
          `/auth/chat/${loadedChatInfo.id}`,
          body,
          config
        );
        setMessages((msgs) => [...msgs, msg.data]);
        console.log(msg.data);
        socket.emit("private", msg.data);
        setTextAriaMessage("");
      } catch (err) {
        console.log(err.response.data.errors[0].msg);
      }
    }
  };
  const selecteUserChat = async (id, name) => {
    if (id !== loadedChatInfo.id) {
      const messages = await axios.get(`/auth/chat/${id}/${currentUserId}`);
      setReceiverId(id);
      setLoadedChatInfo({ id: id, name: name });
      setMessages(messages.data);
    }
  };
  useEffect(() => {
    socket = io.connect(ENDPOINT);
    socket.emit("login", { userId: currentUserId });
    return () => {
      socket.emit("off", { userId: currentUserId });
    };
  }, []);
  const establichConnection = () => {
    // console.log(receiverId);
  };
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
              {itemFinderUser && (
                <ListItem
                  button
                  onClick={() =>
                    selecteUserChat(itemFinderUser._id, itemFinderUser.name)
                  }
                >
                  <ListItemAvatar>
                    <Avatar>{itemFinderUser.name.charAt(0)}</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={itemFinderUser.name} />
                </ListItem>
              )}
              {/* chat users  */}
              {chatUsers.length > 0 &&
                chatUsers.map((user) => (
                  <ListItem
                    button
                    onClick={() => selecteUserChat(user._id, user.name)}
                    key={user._id}
                  >
                    <ListItemAvatar>
                      <Avatar>{user.name.charAt(0)}</Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={user.name} />
                  </ListItem>
                ))}
            </List>
            {noConversation && (
              <h4 className={classes.noConversations}>No Conversations</h4>
            )}
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
              <Typography variant="h4">
                {loadedChatInfo
                  ? loadedChatInfo.name
                  : !noConversation
                  ? "Loading"
                  : null}
              </Typography>
            </Grid>
            <Grid item>
              <IconButton onClick={ClearAllModels}>
                <ClearIcon />
              </IconButton>
            </Grid>
          </Grid>
          {/* user info and delete chat button  */}
          {/* messages conatiner  */}
          <Grid className={classes.messagesArea} id="messagesArea">
            {/* user message  */}
            {messages ? (
              <Messages messages={messages} classes={classes} socket={socket} />
            ) : !noConversation ? (
              "Loading..."
            ) : (
              <p className={classes.messengerIsEmpty}>
                Welcome To The Messenger
              </p>
            )}
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
                <textarea
                  className={classes.messageTypingInput}
                  id="textArea"
                  onChange={textareaMessageHandler}
                  value={textAriaMessage}
                  disabled={noConversation}
                ></textarea>
              </Grid>
              <Grid item xs={1}>
                <button
                  className={classes.messgaeSendButton}
                  onClick={sendMessage}
                >
                  SEND
                </button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* chat content area  */}
      </Grid>
    </div>
  );
};

const mapState = (state) => {
  return {
    itemFinderId: state.model.itemFinderId,
    currentUserId: state.auth.profile._id,
  };
};
const mapDispatch = (dispatch) => {
  return {
    ClearAllModels: () => dispatch({ type: "ClearAllModels" }),
  };
};
export default connect(mapState, mapDispatch)(Chatapp);
