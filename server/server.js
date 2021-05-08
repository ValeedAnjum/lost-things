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
io.on("connection", (socket) => {
  socket.on("message", (data) => {
    socket.join(data.id);
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
