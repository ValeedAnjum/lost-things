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
  const { name, date, lat, lng, details } = req.body;
  let file;
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
