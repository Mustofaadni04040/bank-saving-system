const express = require("express");
const router = express.Router();
const {
  createDepositoType,
  getAllDepositoTypes,
} = require("../controllers/depositoTypeController");
const adminAuth = require("../middlewares/adminAuth");

router.post("/create-deposito", adminAuth, createDepositoType);

module.exports = router;
