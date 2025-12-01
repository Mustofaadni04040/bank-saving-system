import type e = require("express");
const Admin = require("../models/adminModel");
import bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const loginAdmin = async (req: e.Request, res: e.Response) => {
  try {
    const { name, password } = req.body;

    if (!name || !password) {
      return res
        .status(400)
        .json({ message: "Name and password are required" });
    }

    const admin = await Admin.findOne({ name });

    if (!admin) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordMatch = await bcrypt.compare(password, admin.password);

    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Incorrect password, try again" });
    }

    const tokenData = {
      adminId: admin._id,
      role: "admin",
    };

    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    return res.status(200).json({ name: admin.name, token, success: true });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { loginAdmin };
