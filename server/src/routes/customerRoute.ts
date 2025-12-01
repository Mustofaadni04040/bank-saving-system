const express = require("express");
const router = express.Router();
const {
  createCustomer,
  loginCustomer,
} = require("../controllers/customerController");

router.post("/create-customer", createCustomer);
router.post("/login-customer", loginCustomer);

module.exports = router;
