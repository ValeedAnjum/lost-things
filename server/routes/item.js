const express = require("express");
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

// @route    GET item/get-items/:num
// @desc     get items by specifying numbers of items
// @access   Public

router.get("/get-items/:num", async (req, res) => {
  const { num } = req.params;
  try {
    const items = await Item.find().limit(Number(num)).select(["img", "name"]);
    return res.json(items);
  } catch (error) {
    return res.status(500).send("Server Error");
  }
});

// @route    GET item/get-items/:id
// @desc     get item by specifying id
// @access   Public

router.get("/get-items/:num/:id", async (req, res) => {
  const { id, num } = req.params;
  try {
    const item = await Item.find({ _id: { $gt: id } })
      .limit(Number(num))
      .select(["img", "name"]);
    return res.json(item);
  } catch (error) {
    return res.status(500).send("Server Error");
  }
});

router.get("/getitem/:num/:lat/:lng", async (req, res) => {
  const { num, lat, lng } = req.params;
  const { id } = req.query;
  console.log(id);
  try {
    const items = id
      ? await Item.find({
          lat: { $gte: 1, $lte: 30 },
          lng: { $gte: 1, $lte: 80 },
          _id: { $gt: id },
        })
          .limit(Number(num))
          .select(["img", "name"])
      : await Item.find({
          lat: { $gte: 1, $lte: 30 },
          lng: { $gte: 1, $lte: 80 },
        })
          .limit(Number(num))
          .select(["img", "name"]);
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
