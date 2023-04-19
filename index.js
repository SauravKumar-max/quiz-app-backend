const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
require("dotenv").config();

const port = process.env.PORT || 3030;

const { initializeDBConnection } = require("./db/db.connect");
const pageNotFound = require("./middleware/pageNotFound");
const internalSeverError = require("./middleware/internalServerError");

const quizRouter = require("./routes/quiz.routes");
const userRouter = require("./routes/user.routes");
const scoreRouter = require("./routes/scores.routes");

app.use(cors());
app.use(bodyParser.json());
initializeDBConnection();

app.get("/", (req, res) => {
  res.send("Quiz App API");
});

app.use("/quizzes", quizRouter);
app.use("/users", userRouter);
app.use("/scores", scoreRouter);

//  ** Note: DO NOT MOVE (This should be last Route) **

// 404 error route Handler
app.use(pageNotFound);

// 500 server error handler
app.use(internalSeverError);

app.listen(port, () => {
  console.log("server started");
});
