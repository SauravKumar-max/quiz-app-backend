const express = require("express");
const router = express.Router();
// const { quizData } = require("../db/data");
const { Quiz } = require("../models/quiz.models");

router
  .route("/")
  .get(async (req, res) => {
    try {
      // const quiz = await Quiz.insertMany(quizData);
      const quiz = await Quiz.find();
      res.json({ quiz });
    } catch (error) {
      console.log(error);
    }
  })

  .post(async (req, res) => {
    try {
      const newQuiz = req.body;
      const AddQuiz = new Quiz(newQuiz);
      const saveQuiz = await AddQuiz.save();
      res.json({ success: true, saveQuiz });
    } catch (error) {
      console.log(error);
    }
  });

module.exports = router;
