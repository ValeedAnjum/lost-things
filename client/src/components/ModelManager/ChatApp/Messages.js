import React, { useEffect, useState } from "react";
import Message from "./Message";

const Messages = ({ messages, classes, socket, setMessages }) => {
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

// import React, { Component } from "react";

// class Messages extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { localMessages: props.messages };
//   }

//   componentDidMount() {
//     const { socket } = this.props;
//     let msgArea = document.getElementById("messagesArea");
//     let scrollHeight = msgArea.scrollHeight;
//     // msgArea.scrollTo(0, scrollHeight);
//     msgArea.scrollTo({
//       top: scrollHeight,
//       left: 0,
//       behavior: "smooth",
//     });

//     socket.on("message", (data) => {
//       // setLocalMessages((msgs) => [...msgs, data]);
//       this.setState({ localMessages: [...this.state.localMessages, data] });
//       msgArea.scrollTo({
//         top: scrollHeight,
//         left: 0,
//         behavior: "smooth",
//       });
//     });
//   }
//   // static getDerivedStateFromProps(props, state) {
//   //   // console.log(props);
//   //   // console.log(state);
//   //   return { ...state, localMessages: props.messages };
//   // }

//   render() {
//     const { classes } = this.props;

//     return (
//       <>
//         {this.state.localMessages.map((msg, index) => (
//           <Message msg={msg} classes={classes} key={index} />
//         ))}
//       </>
//     );
//   }
// }
// export default Messages;
