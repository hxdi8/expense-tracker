const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  admin: String,
  adminPassword: String,
});

module.exports = mongoose.model("Admin", adminSchema);
