const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      index: true,
      required: true,
    },
    type: { type: String, enum: ["deposit", "withdraw"], required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now() },
    startingBalance: {
      type: Number,
      required: true,
    },
    endingBalance: {
      type: Number,
      required: true,
    },
    months: Number,
    monthlyReturn: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
