const express = require("express");
const router = express.Router();
const multer = require("multer");
const Item = require("../models/item");
const auth = require("../middleware/auth");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    // cb(null, Date.now() + "-" + file.originalname);
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage }).single("file");

// @route    POST item/save-item
// @desc     Saving item
// @access   Private
router.post("/save-item", auth, async (req, res) => {
  const { name, date, lat, lng, details, file, address } = req.body;

  const item = new Item({
    name,
    foundDate: date,
    lat,
    lng,
    finderId: req.user.id,
    img: file,
    details,
    address,
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
    const items = await Item.find()
      .limit(Number(num))
      .select(["img", "name", "address"]);
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
      .select(["img", "name", "address"]);
    return res.json(item);
  } catch (error) {
    return res.status(500).send("Server Error");
  }
});

router.get("/getitem/:num/:lat/:lng", async (req, res) => {
  const { num, lat, lng } = req.params;
  const { id } = req.query;
  const [latRange, lngRange] = [
    [Math.floor(lat), Math.floor(lat) + 2],
    [Math.floor(lng), Math.floor(lng) + 2],
  ];
  try {
    const items = id
      ? await Item.find({
          lat: { $gte: latRange[0], $lte: latRange[1] },
          lng: { $gte: lngRange[0], $lte: lngRange[1] },
          _id: { $gt: id },
        })
          .limit(Number(num))
          .select(["img", "name", "address"])
      : await Item.find({
          lat: { $gte: latRange[0], $lte: latRange[1] },
          lng: { $gte: lngRange[0], $lte: lngRange[1] },
        })
          .limit(Number(num))
          .select(["img", "name", "address"]);
    return res.json(items);
  } catch (error) {
    return res.status(500).send("Srever error");
  }
});

// @route    POST item/getitemdetails/:id
// @desc     Uploading a file it is a temp route
// @access   Public
router.get("/getitemdetails/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const detail = await Item.findById(id);
    return res.json(detail);
  } catch (error) {
    return res.status(500).send("Server Error");
  }
});
// @route    get item/saveditems
// @desc     get all items uploaded by authenicated user
// @access   Private
router.get("/saveditems", auth, async (req, res) => {
  try {
    const items = await Item.find({ finderId: req.user.id });
    return res.json(items);
  } catch (err) {
    return res.status(500).send("Server Error");
  }
});

// @route    POST item/deleteitem/:id
// @desc     delete item bu document id
// @access   Private
router.post("/deleteitem/:id", auth, async (req, res) => {
  console.log(req.params.id);
  try {
    const deleteResponse = await Item.findByIdAndRemove(req.params.id);
    return res.json({ removed: true });
  } catch (err) {
    return res.status(500).send("Server Error");
  }
});

// @route    POST item/file_upload
// @desc     Uploading a file it is a temp route
// @access   Public
// router.route("/upload").post(upload, async (req, res, next) => {
router.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    console.log(req.file);
    return res.status(200).send(req.file.filename);
  });
});

module.exports = router;
