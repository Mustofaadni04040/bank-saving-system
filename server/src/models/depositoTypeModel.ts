const mongoose = require("mongoose");

const depositoTypeSchema = new mongoose.Schema(
  {
    name: String,
    yearlyReturn: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("DepositoType", depositoTypeSchema);
