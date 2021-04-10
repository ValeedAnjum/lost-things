const mongoose = require("mongoose");
const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  foundDate: {
    type: Date,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  details: [
    {
      type: String,
    },
  ],
  finderId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "ltf_user",
  },
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
});

module.exports = Item = mongoose.model("ltf_item", itemSchema);
