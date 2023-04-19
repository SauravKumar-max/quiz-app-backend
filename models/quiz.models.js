const mongoose = require("mongoose");
const { Schema } = mongoose;

const MCQSchema = new mongoose.Schema({
  question: String,
  points: Number,
  options: [
    {
      text: String,
      isCorrect: Boolean,
    },
  ],
});

const QuizSchema = new mongoose.Schema(
  {
    _id: Schema.Types.ObjectId,
    name: String,
    image: String,
    mcq: [MCQSchema],
  },
  { timestamps: true }
);

const Quiz = mongoose.model("Quiz", QuizSchema);

module.exports = { Quiz };
