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
  console.log("Connection");

  socket.on("login", (user) => {
    // connectedUsers.push({ userId: user.id, socket });
    console.log("Anjum");
    socket.broadcast.to(socket.id).emit("mesaage", "I am p msg");
  });

  // socket.on("private", (data) => {
  //   console.log("data", data);
  //   socket.broadcast.to(connectedUsers[1].id).emit("mesaage", "I am p msg");
  // });
});

//on new connection and disconnection

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
