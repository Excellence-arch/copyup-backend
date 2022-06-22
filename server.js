const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const usersRoute = require("./routes/users.route");
require("dotenv").config();

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({limit: "50mb"}));
app.use(cors());
app.use("/users", usersRoute);

const URI = process.env.URI

mongoose.connect(URI, (err) => {
  if(!err) {
    console.log("Connection to the database established");
  } else {
    console.log(`"Error connecting to the database`);
  }
})

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`app is listening on Port: ${PORT}`))