const express = require("express");
const router = express.Router();
const {
  createDepositoType,
  getAllDepositoTypes,
  updateDepositoType,
} = require("../controllers/depositoTypeController");
const adminAuth = require("../middlewares/adminAuth");

router.post("/create-deposito", adminAuth, createDepositoType);
router.get("/get-deposito-types", getAllDepositoTypes);
router.put("/update-deposito/:id", adminAuth, updateDepositoType);

module.exports = router;
