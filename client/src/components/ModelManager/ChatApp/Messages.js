import React, { useEffect, useState } from "react";
import Message from "./Message";

const Messages = ({ messages, classes, socket }) => {
  const [localMessages, setLocalMessages] = useState(messages);
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
      setLocalMessages((msgs) => [...msgs, data]);
      msgArea.scrollTo({
        top: scrollHeight,
        left: 0,
        behavior: "smooth",
      });
    });
  }, []);

  return (
    <>
      {localMessages.map((msg, index) => (
        <Message msg={msg} classes={classes} key={index} />
      ))}
    </>
  );
};

export default Messages;
