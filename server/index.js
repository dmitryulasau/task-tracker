// CREATING EXPRESS SERVER
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const taskRoute = require("./routes/tasks");
const categoryRoute = require("./routes/categories");
const cors = require("cors");

dotenv.config();
app.use(express.json());
app.use(cors());

// DATABASE CONNECTION
const uri = process.env.MONGO_URL;

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("Error connecting to MongoDB", error));

app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/tasks", taskRoute);
app.use("/categories", categoryRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});
