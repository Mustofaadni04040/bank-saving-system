const express = require("express");
const router = express.Router();
const {
  createAccount,
  setDepositoAccount,
  updateAccount,
  getAllAccounts,
} = require("../controllers/accountController");
const customerAuth = require("../middlewares/customerAuth");
const adminAuth = require("../middlewares/adminAuth");

router.post("/create-account", customerAuth, createAccount);
router.post("/:accountId/set-deposito", customerAuth, setDepositoAccount);
router.put("/update-account/:accountId", customerAuth, updateAccount);
router.get("/get-accounts", adminAuth, getAllAccounts);

module.exports = router;
