const express = require("express");
const router = express.Router();
const {
  createAccount,
  setDepositoAccount,
  updateAccount,
} = require("../controllers/accountController");
const customerAuth = require("../middlewares/customerAuth");

router.post("/create-account", customerAuth, createAccount);
router.post("/:accountId/set-deposito", customerAuth, setDepositoAccount);
router.put("/update-account/:accountId", customerAuth, updateAccount);

module.exports = router;
