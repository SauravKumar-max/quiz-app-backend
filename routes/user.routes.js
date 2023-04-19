const express = require("express");
const router = express.Router();
const authVerify = require("../middleware/authVerify");
const { User } = require("../models/user.models");
const jwt = require("jsonwebtoken");
const mySecret = process.env["TOKEN_SECRECT"];

const { OAuth2Client } = require("google-auth-library");
const clientId = process.env["OAUTH_CLIENT_ID"];
const client = new OAuth2Client(clientId);

router.route("/").get(authVerify, async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await User.findById({ _id: userId });
    res.json({ success: true, user });
  } catch (error) {
    res.json({ success: false, errorMessage: "Page Not Found" });
  }
});

router.route("/signin").post(async (req, res) => {
  try {
    const { gmailToken } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: gmailToken,
      audience: clientId,
    });
    const { email, name, picture } = ticket.getPayload();
    const users = await User.find();
    const getUser = users.find((user) => user.email === email);

    if (!getUser) {
      const newUser = {
        email,
        name,
        picture,
        score: { astronomy: 0, science: 0, friends: 0 },
      };
      const AddUser = new User(newUser);
      const saveUser = await AddUser.save();
      const token = jwt.sign({ userId: saveUser._id }, mySecret);
      return res.json({ success: true, email, token });
    } else {
      const token = jwt.sign({ userId: getUser._id }, mySecret);
      return res.json({ success: true, email: getUser.email, token });
    }
  } catch (error) {
    res.json({
      success: false,
      errorMessage: "Couldn't signIn! Try again later",
    });
  }
});

module.exports = router;
