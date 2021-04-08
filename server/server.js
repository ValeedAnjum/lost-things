const express = require("express");
const app = express();
const cors = require("cors");
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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
