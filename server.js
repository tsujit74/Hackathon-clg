const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const uri = process.env.DB_URL;

const app = express();
app.set("port", process.env.PORT || 5500);

app.get("/home", (req, res) => {
  res.send("done it work");
});

const start = async () => {
  mongoose
    .connect(uri, {})
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error: ", err));

  app.listen(app.get("port"), () => {
    console.log("Listing at port 5500");
  });
};

start();
