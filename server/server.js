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
let clientSocketIds = [];
let connectedUsers = [];

io.on("connection", (socket) => {
  // console.log("Connection");
  //when the user closes chat application
  socket.on("off", (data) => {
    connectedUsers = connectedUsers.filter(
      (user) => user.userId !== data.userId
    );
    clientSocketIds = clientSocketIds.filter(
      (ids) => ids.userId !== data.userId
    );
  });
  //when the get disconnetc
  socket.on("disconnect", () => {
    connectedUsers = connectedUsers.filter(
      (user) => user.socketId !== socket.id
    );
    clientSocketIds = clientSocketIds.filter(
      (ele) => ele.socket.id !== socket.id
    );
  });

  //when the user opens chat application
  socket.on("login", (user) => {
    clientSocketIds.push({ userId: user.userId, socket });
    connectedUsers.push({ userId: user.userId, socketId: socket.id });
    // console.log("login", connectedUsers);
  });

  //send private message
  socket.on("private", (data) => {
    const { receiverId } = data;
    // console.log(receiverId);
    if (
      connectedUsers.some(
        (ids) => Object.values(ids).indexOf(receiverId) !== -1
      )
    ) {
      const socket = clientSocketIds.find((ids) => ids.userId === receiverId);
      io.to(socket.socket.id).emit("message", data);
    }
  });
});

//on new connection and disconnection

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
