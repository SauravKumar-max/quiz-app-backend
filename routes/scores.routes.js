const express = require("express");
const router = express.Router();
const { User } = require("../models/user.models");
const authVerify = require("../middleware/authVerify");

router.route("/").post(authVerify, async (req, res) => {
  try {
    const updateScore = req.body;
    const { userId } = req.user;
    const user = await User.findById({ _id: userId });
    const newScores = { ...user.score, ...updateScore };
    await User.findByIdAndUpdate({ _id: userId }, { score: newScores });
    res.json({ success: true, newScores });
  } catch (error) {
    res.json({ success: false, errorMessage: "Unable to get Scores" });
  }
});

router.route("/allscores").get(async (req, res) => {
  try {
    const user = await User.find();
    const allScores = user.map((user) => ({
      _id: user._id,
      name: user.name,
      score: user.score,
    }));
    res.json({ succes: true, allScores });
  } catch (error) {
    res.json({ success: false, errorMessage: "Unable to get Scores" });
  }
});

module.exports = router;
