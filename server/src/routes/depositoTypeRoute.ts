const express = require("express");
const router = express.Router();
const {
  createDepositoType,
  getAllDepositoTypes,
  updateDepositoType,
  deleteDepositoType,
} = require("../controllers/depositoTypeController");
const adminAuth = require("../middlewares/adminAuth");
const isValidatedObjectId = require("../middlewares/isValidatedObjectId");

router.post("/create-deposito", adminAuth, createDepositoType);
router.get("/get-deposito-types", getAllDepositoTypes);
router.put(
  "/update-deposito/:id",
  adminAuth,
  isValidatedObjectId,
  updateDepositoType
);
router.delete(
  "/delete-deposito/:id",
  adminAuth,
  isValidatedObjectId,
  deleteDepositoType
);

module.exports = router;
