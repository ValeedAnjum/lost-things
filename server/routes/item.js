const express = require("express");
const { models } = require("mongoose");
const router = express.Router();
const Item = require("../models/item");
const auth = require("../middleware/auth");

// @route    POST item/save-item
// @desc     Saving item
// @access   Private
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

// @route    GET item/get-items
// @desc     get item
// @access   Public

router.get("/get-items", async (req, res) => {
  try {
    const items = await Item.find().select("-details");
    return res.json(items);
  } catch (error) {
    return res.status(500).send("Server Error");
  }
});

router.get("/getitem/:lat/:lon", async (req, res) => {
  const { lat, lon } = req.params;
  try {
    const items = await Item.find({
      lat: { $gte: 1, $lte: 30 },
      lon: { $gte: 1, $lte: 80 },
    });
    // console.log(items);
    return res.json(items);
  } catch (error) {
    return res.status(500).send("Srever error");
  }
});

// @route    POST item/file_upload
// @desc     Uploading a file it is a temp route
// @access   Public

router.post("/upload", (req, res) => {
  const { name } = req.body;
  if (req.files) {
    // console.log(req.files.image);
    const image = req.files.image;
    image.mv(`./upload/` + req.files.image.name, function (err) {
      if (err) {
        res.send(err);
      } else {
        res.send("File Uploaded");
        console.log(__dirname + `/req.files.image.name`);
      }
    });
  }
});

module.exports = router;
