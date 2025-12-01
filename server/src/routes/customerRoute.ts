const express = require("express");
const router = express.Router();
const { createCustomer } = require("../controllers/customerController");

router.post("/create-customer", createCustomer);

module.exports = router;
