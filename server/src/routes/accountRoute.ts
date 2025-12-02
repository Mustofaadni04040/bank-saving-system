const express = require("express");
const router = express.Router();
const { createAccount } = require("../controllers/accountController");
const customerAuth = require("../middlewares/customerAuth");

router.post("/create-account", customerAuth, createAccount);

module.exports = router;
