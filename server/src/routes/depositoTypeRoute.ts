const express = require("express");
const router = express.Router();
const {
  createDepositoType,
  getAllDepositoTypes,
  updateDepositoType,
  deleteDepositoType,
} = require("../controllers/depositoTypeController");
const adminAuth = require("../middlewares/adminAuth");

router.post("/create-deposito", adminAuth, createDepositoType);
router.get("/get-deposito-types", getAllDepositoTypes);
router.put("/update-deposito/:id", adminAuth, updateDepositoType);
router.delete("/delete-deposito/:id", adminAuth, deleteDepositoType);

module.exports = router;
