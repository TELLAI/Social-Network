const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user.routes");
require("./config/db");
require("dotenv").config({ path: "./config/.env" });

// bodyParser va nous permettre de mettre en forme les requtes 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// routes
app.use("/api/user", userRoutes);

// server
app.listen(process.env.PORT, () => {
  console.log(`Listenning on port ${process.env.PORT}`);
});
