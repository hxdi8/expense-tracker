const express = require("express");
const Admin = require("../models/Admin");

const router = express.Router();

router.post("/admin-login", async (req, res) => {
  try {
    const { admin, adminPassword } = req.body;

    const adminUser = await Admin.findOne({ admin, adminPassword });

    if (!adminUser) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      admin: {
        id: adminUser._id,
        admin: adminUser.admin,
      },
    });
  } catch (error) {
    console.error("Login failed", error);
    res.status(500).json({ message: "Login failed" });
  }
});

module.exports = router;

