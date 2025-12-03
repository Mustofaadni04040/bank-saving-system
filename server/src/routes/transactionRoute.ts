const express = require("express");
const router = express.Router();
const customerAuth = require("../middlewares/customerAuth");
const isValidatedObjectId = require("../middlewares/isValidatedObjectId");
const { depositTransaction } = require("../controllers/transactionController");

router.post(
  "/deposit-transaction/:accountId",
  customerAuth,
  isValidatedObjectId,
  depositTransaction
);

module.exports = router;
