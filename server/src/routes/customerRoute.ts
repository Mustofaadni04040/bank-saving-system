const express = require("express");
const router = express.Router();
const {
  createCustomer,
  loginCustomer,
  updateCustomer,
} = require("../controllers/customerController");
const adminAuth = require("../middlewares/adminAuth");
const customerAuth = require("../middlewares/customerAuth");

router.post("/create-customer", adminAuth, createCustomer);
router.post("/login-customer", loginCustomer);
router.put("/update-customer", customerAuth, updateCustomer);

module.exports = router;
