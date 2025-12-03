const express = require("express");
const router = express.Router();
const {
  createCustomer,
  loginCustomer,
  updateCustomer,
  getAllCustomers,
  deleteCustomer,
} = require("../controllers/customerController");
const adminAuth = require("../middlewares/adminAuth");
const customerAuth = require("../middlewares/customerAuth");
const isValidatedObjectId = require("../middlewares/isValidatedObjectId");

router.post("/create-customer", adminAuth, createCustomer);
router.post("/login-customer", loginCustomer);
router.put("/update-customer", customerAuth, updateCustomer);
router.get("/get-customers", adminAuth, getAllCustomers);
router.delete(
  "/delete-customer/:id",
  adminAuth,
  isValidatedObjectId,
  deleteCustomer
);

module.exports = router;
