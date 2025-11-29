const mongoose = require("mongoose");

const depositoSchema = new mongoose.Schema(
  {
    name: String,
    yearlyReturn: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Deposito", depositoSchema);
