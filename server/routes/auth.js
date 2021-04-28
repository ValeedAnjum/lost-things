const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/user");
const Chat = require("../models/chat");
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

router.post(
  "/signin",
  [
    check("email", "Please enter a valid email address").isEmail(),
    check("password", "Please enter password").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User does not exists" }] });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: "Wrong Password" }] });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 60 * 60 * 24 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      res.status(500).send("Server Error");
    }
  }
);

router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Enter a valid email address").isEmail(),
    check("password", "Password is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }
      user = new User({ name, email, password });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      ///will generate a token
      // sendEmailToUser(res, "I am a token");
      ///will generate a token
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      res.status(500).send("Server Error");
    }
  }
);

router.get("/user", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      res.status(400).json({ error: [{ msg: "User deos not exists" }] });
    }
    res.json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET auth/userinfo/:id
// @desc     get user info
// @access   Private
router.get("/userinfo/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).select("-password");
    if (!user) {
      res.status(400).json({ error: [{ msg: "User deos not exists" }] });
    }
    res.json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST auth/chat/:receiverid
// @desc     save user chat
// @access   Private
router.post("/chat/:receiverid", auth, async (req, res) => {
  const { receiverid } = req.params;
  // const { receiverid } = req.query;
  const senderId = req.user.id;
  const { message, type } = req.body;
  try {
    const chat = new Chat({
      message: message,
      type: type,
      senderId,
      receiverId: receiverid.trim(),
    });
    const result = await chat.save();
    res.json(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

// @route    Get auth/chat/:receiverid/:senderid
// @desc     get user chat
// @access   Private
router.get("/chat/:receiverid/:senderid", auth, async (req, res) => {
  const { receiverid, senderid } = req.params;
  try {
    // const result = await Chat.find({
    //   senderId: { $eq: senderid },
    //   receiverId: { $eq: receiverid },
    // });
    const result = await Chat.find({
      $or: [{ senderId: { $eq: senderid } }, { senderId: { $eq: receiverid } }],
      // $or: [{ receiverId: { $eq: receiverid }, receiverId: { $eq: senderid } }],
    });
    res.json(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
