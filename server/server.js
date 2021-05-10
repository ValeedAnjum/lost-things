const express = require("express");
const app = express();
const cors = require("cors");
const socketio = require("socket.io");
const http = require("http");
const connectDB = require("./config/db");
connectDB();

//initialzinfg Middleware
app.use(express.static("uploads"));

app.use(express.json({ extended: false, limit: "10mb" }));
app.use(cors());
//checking
app.get("/", (req, res) => res.send("API IS UP"));

//defining routes
app.use("/auth", require("./routes/auth"));
app.use("/item", require("./routes/item"));

//socket.io
//creating a  http server;
const server = http.createServer(app);
//socket.io instance
const io = socketio(server);

//on new connection and disconnection
let clientsWithSockets = [];
let onlineUsers = [];

io.on("connection", (socket) => {
  // console.log("Connection");
  socket.on("login", (user) => {
    clientsWithSockets.push({ userId: user.userId, socket });
    onlineUsers.push(user.userId);
  });

  //send message
  socket.on("private", (data) => {
    // console.log("sendmsg", onlineUsers);
    // console.log("sockets", clientsWithSockets);
    if (onlineUsers.indexOf(data.receiver) !== -1) {
      const socket = clientsWithSockets.find(
        (ids) => ids.userId === data.receiver
      );
      io.to(socket.socket.id).emit("message", "i am just for one");
    }
  });
});

//on new connection and disconnection

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
