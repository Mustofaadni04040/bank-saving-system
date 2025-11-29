const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    depositoType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DepositoType",
      required: true,
    },
    balance: { type: Number, default: 0 },
    openedAt: { type: Date, default: Date.now() },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Account", accountSchema);
