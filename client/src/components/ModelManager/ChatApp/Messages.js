import React, { useEffect } from "react";
import Message from "./Message";

const Messages = ({ messages, classes, socket }) => {
  useEffect(() => {
    socket.on("message", (data) => {
      console.log("Iamdata", data);
      console.log(messages);
    });
  }, []);
  return (
    <>
      {messages.map((msg) => (
        <Message msg={msg} classes={classes} key={msg._id} />
      ))}
    </>
  );
};

export default Messages;
