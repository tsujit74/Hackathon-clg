import dotenv from "dotenv";
dotenv.config();

import userRoutes from "./routes/user.routes.js"

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const uri = process.env.DB_URL;

const app = express();
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173", // Your frontend URL
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // If you need to send cookies or auth headers
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));app.use(express.json());
app.set("port", process.env.PORT || 5500);

app.use("/api/users",userRoutes)

app.get("/home", (req, res) => {
  res.send("done it work");
});

const start = async () => {
  try {
    await mongoose.connect(uri, {});
    console.log("MongoDB connected");

    app.listen(app.get("port"), () => {
      console.log(`Listening at port ${app.get("port")}`);
    });
  } catch (err) {
    console.error("MongoDB connection error: ", err);
  }
};

start();
