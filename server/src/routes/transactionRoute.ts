const express = require("express");
const router = express.Router();
const customerAuth = require("../middlewares/customerAuth");
const adminAuth = require("../middlewares/adminAuth");
const isValidatedObjectId = require("../middlewares/isValidatedObjectId");
const {
  depositTransaction,
  withdrawTransaction,
  getAllTransactions,
  getTransactionsByCustomerId,
} = require("../controllers/transactionController");

router.post(
  "/deposit-transaction/:accountId",
  customerAuth,
  isValidatedObjectId,
  depositTransaction
);
router.post(
  "/withdraw-transaction/:accountId",
  customerAuth,
  isValidatedObjectId,
  withdrawTransaction
);
router.get("/get-transactions", adminAuth, getAllTransactions);
router.get(
  "/get-transactions/:accountId",
  customerAuth,
  isValidatedObjectId,
  getTransactionsByCustomerId
);

module.exports = router;
