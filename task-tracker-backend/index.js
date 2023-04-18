// CREATING EXPRESS SERVER
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();
// DATABASE CONNECTION
const uri = process.env.MONGO_URL;

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("Error connecting to MongoDB", error));

app.listen("5000", () => {
  console.log("Server is running at");
});
