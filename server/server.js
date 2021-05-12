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
  socket.on("off", (data) => {
    onlineUsers.splice(onlineUsers.indexOf(data.userId));
    clientsWithSockets = clientsWithSockets.filter(
      (ids) => ids.userId !== data.userId
    );
    console.log("off", onlineUsers);
  });

  socket.on("login", (user) => {
    clientsWithSockets.push({ userId: user.userId, socket });
    onlineUsers.push(user.userId);
    console.log("login", onlineUsers);
  });

  //send message
  socket.on("private", (data) => {
    const { receiver, msg, sender } = data;
    // console.log(onlineUsers);
    if (onlineUsers.indexOf(receiver) !== -1) {
      const socket = clientsWithSockets.find((ids) => ids.userId === receiver);
      io.to(socket.socket.id).emit("message", { msg, sender });
    }
  });
});

//on new connection and disconnection

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
