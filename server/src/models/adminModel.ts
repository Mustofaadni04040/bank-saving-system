const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true },
    password: String,
    role: { type: String, default: "admin" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Admin", adminSchema);
