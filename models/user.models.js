const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: [true, "email already exists, please login!"],
    },

    picture: {
      type: String,
      required: true,
    },

    score: {
      astronomy: Number,
      science: Number,
      friends: Number,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", UserSchema);

module.exports = { User };
