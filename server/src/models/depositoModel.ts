const mongoose = require("mongoose");

const depositoSchema = new mongoose.Schema({
  name: String,
  yearlyReturn: Number,
});

module.exports = mongoose.model("Deposito", depositoSchema);
