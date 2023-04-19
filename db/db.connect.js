const mongoose = require("mongoose");

async function initializeDBConnection() {
  const mySecret = process.env["MONGODB_AUTH"];

  try {
    const uri = `mongodb+srv://${mySecret}@cluster0.iha7u.mongodb.net/quiz-app?retryWrites=true&w=majority`;

    await mongoose.connect(uri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      connectWithNoPrimary: false,
    });

    console.log("Connection Completed");
  } catch (error) {
    console.log("Failed to connect", { error });
  }
}

module.exports = { initializeDBConnection };
