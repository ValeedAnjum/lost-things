import React, { useEffect, useState } from "react";
import Message from "./Message";

const Messages = ({ messages, classes, socket, setMessages }) => {
  useEffect(() => {
    let msgArea = document.getElementById("messagesArea");
    let scrollHeight = msgArea.scrollHeight;
    // msgArea.scrollTo(0, scrollHeight);
    msgArea.scrollTo({
      top: scrollHeight,
      left: 0,
      behavior: "smooth",
    });

    socket.on("message", (data) => {
      // console.log(data);
      setMessages((msgs) => [...msgs, data]);
      msgArea.scrollTo({
        top: scrollHeight,
        left: 0,
        behavior: "smooth",
      });
    });
  }, []);
  return (
    <>
      {messages.map((msg, index) => (
        <Message msg={msg} classes={classes} key={index} />
      ))}
    </>
  );
};

export default Messages;
