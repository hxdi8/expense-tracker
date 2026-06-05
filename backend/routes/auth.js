const express = require("express");
const User = require("../models/User");

const router = express.Router();

// Signup

router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(409).json({ message: "User already exists" });
    }

    await User.create({ username, password });

    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    console.error("Signup failed", error);
    res.status(500).json({ message: "Signup failed" });
  }
});

// Login

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username, password });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      user: {
        id: user._id,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Login failed", error);
    res.status(500).json({ message: "Login failed" });
  }
});

module.exports = router;
