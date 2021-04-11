const mongoose = require("mongoose");
require("dotenv").config({ path: "./config/.env" });

mongoose
  .connect(
    "mongodb+srv://youcef:" + process.env.DB_PASSWORD  + "@cluster0.z6zbw.mongodb.net/test",

    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log("Connected to Mongodb"))
  .catch((err) => console.log("Failed to connect to Mongodb", err));