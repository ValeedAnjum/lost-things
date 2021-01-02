const mongoose = require("mongoose");
const itemSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  foundDate: {
    type: Date,
    default: Date.now,
  },
  finderId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "lpf_user",
  },
  lat: {
    type: Number,
  },
  lon: {
    type: Number,
  },
});

module.exports = Item = mongoose.model("lpf_item", itemSchema);
