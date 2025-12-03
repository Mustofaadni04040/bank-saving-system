const express = require("express");
const router = express.Router();
const customerAuth = require("../middlewares/customerAuth");
const isValidatedObjectId = require("../middlewares/isValidatedObjectId");
const {
  depositTransaction,
  withdrawTransaction,
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

module.exports = router;
