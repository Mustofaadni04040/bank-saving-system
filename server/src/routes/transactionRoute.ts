const express = require("express");
const router = express.Router();
const customerAuth = require("../middlewares/customerAuth");
const { depositTransaction } = require("../controllers/transactionController");

router.post(
  "/deposit-transaction/:accountId",
  customerAuth,
  depositTransaction
);

module.exports = router;
