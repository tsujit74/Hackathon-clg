import bcrypt from "bcryptjs"
import crypto from "crypto";

import User from "../models/user.model.js";

export const allUser = async (req, res) => {
    try {
        const users = await User.find({}, "-password"); // Exclude passwords from response
        res.json(users);
    } catch (err) {
        console.error("Error fetching users:", err); // ✅ Debugging
        res.status(500).json({ error: "Server Error", details: err.message });
    }
};


export const register = async (req, res) => {
    try {
      const { name, email, password,  } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required!" });
      }
  
      const user = await User.findOne({ email });
      if (user) return res.status(400).json({ message: "User already exists!" });
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        
      });
      await newUser.save();
  
      return res.json({
        message: "User registered successfully and email sent!",
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  
  export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: "All fields are required!" });
      }
  
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: "User does not exist" });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid username or password" });
      }
  
      const token = crypto.randomBytes(32).toString("hex");
      await User.updateOne({ _id: user._id }, { token });
  
      return res.json({
        token,
        user: {
          username: user.username,
          email: user.email,
          name: user.name,
        },
      });
    } catch (error) {
      console.error(error); // Log the error for debugging
      return res.status(500).json({ message: error.message });
    }
  };