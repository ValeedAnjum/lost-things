const express = require("express");
const { models } = require("mongoose");
const router = express.Router();
const Item = require("../models/item");
const auth = require("../middleware/auth");
router.post("/save-item", auth, async (req, res) => {
  const { name, date, lat, lng, file, details } = req.body;
  // res.json(req.body);
  // console.log(req.body);
  const item = new Item({
    name,
    foundDate: date,
    lat,
    lng,
    finderId: req.user.id,
    img: file,
    details,
  });

  try {
    const itemdata = await item.save();
    return res.json(itemdata);
  } catch (error) {
    return res.status(500).send("Server Error");
  }
});

router.get("/getitem/:lat/:lon", async (req, res) => {
  const { lat, lon } = req.params;
  try {
    const items = await Item.find({
      lat: { $gte: 1, $lte: 5 },
      lon: { $gte: 11, $lte: 13 },
    });
    // console.log(items);
    return res.json(items);
  } catch (error) {
    return res.status(500).send("Srever error");
  }
});

module.exports = router;
