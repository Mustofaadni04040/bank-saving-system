const express = require("express");
const router = express.Router();
const { loginAdmin } = require("../controllers/adminController");
const adminAuth = require("../middlewares/adminAuth");
const customerAuth = require("../middlewares/customerAuth");

router.post("/login-admin", loginAdmin);

module.exports = router;
