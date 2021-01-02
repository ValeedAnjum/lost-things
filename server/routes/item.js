const express = require("express");
const { models } = require("mongoose");
const router = express.Router();
const Item = require("../models/item");
const auth = require("../middleware/auth");
router.post("/save-item", auth, async (req, res) => {
  const { name, lat, lon } = req.body;
  const item = new Item({ name, lat, lon, finderId: req.user.id });

  try {
    const itemdata = await item.save();
    return res.json(itemdata);
  } catch (error) {
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
