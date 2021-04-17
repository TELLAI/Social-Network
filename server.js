const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user.routes");
const {checkUser} = require("./middleware/auth.middleware")
require("./config/db");
require("dotenv").config({ path: "./config/.env" });

// bodyParser va nous permettre de mettre en forme les requtes 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

// jwt 
app.get('*', checkUser); // l'etoile nous permet de selectionner toutes les routes et ainsi de faire la verification sur chaque route

// routes
app.use("/api/user", userRoutes);

// server
app.listen(process.env.PORT, () => {
  console.log(`Listenning on port ${process.env.PORT}`);
});
